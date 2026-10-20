// payment-gateway authorizes card payments: it validates the request, takes a
// connection from the ledger DB pool, writes the authorization and replies.
package main

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"time"
)

var errPoolTimeout = errors.New("db pool: acquire timeout")

// Pool is a fixed-size connection pool (a semaphore stands in for real connections).
type Pool struct{ slots chan struct{} }

func NewPool(size int) *Pool { return &Pool{slots: make(chan struct{}, size)} }

func (p *Pool) Acquire(ctx context.Context, wait time.Duration) (func(), error) {
	ctx, cancel := context.WithTimeout(ctx, wait)
	defer cancel()
	select {
	case p.slots <- struct{}{}:
		return func() { <-p.slots }, nil
	case <-ctx.Done():
		return nil, errPoolTimeout
	}
}

func (p *Pool) InUse() int { return len(p.slots) }

type authRequest struct {
	MerchantID  string `json:"merchant_id"`
	AmountMinor int64  `json:"amount_minor"`
	CardToken   string `json:"card_token"`
}

func authorize(cfg Config, pool *Pool, log *slog.Logger) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req authRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.AmountMinor <= 0 {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}
		release, err := pool.Acquire(r.Context(), cfg.DBAcquireWait)
		if err != nil {
			log.Warn("acquire conn timeout", "wait_ms", cfg.DBAcquireWait.Milliseconds(), "in_use", pool.InUse(), "max", cfg.DBMaxConns)
			http.Error(w, "temporarily unavailable", http.StatusServiceUnavailable)
			return
		}
		defer release()
		time.Sleep(40 * time.Millisecond) // write the authorization (simulated)
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]string{"status": "authorized", "card": req.CardToken})
	}
}

func main() {
	log := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	cfg, err := LoadConfig()
	if err != nil {
		log.Error("config", "err", err)
		os.Exit(1)
	}
	log.Info("starting", "db_max_conns", cfg.DBMaxConns, "acquire_timeout_ms", cfg.DBAcquireWait.Milliseconds())
	http.HandleFunc("/v1/authorize", authorize(cfg, NewPool(cfg.DBMaxConns), log))
	log.Error("server", "err", http.ListenAndServe(":8080", nil))
}
