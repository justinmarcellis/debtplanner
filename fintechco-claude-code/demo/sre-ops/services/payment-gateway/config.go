package main

import (
	"fmt"
	"os"
	"strconv"
	"time"
)

// Config is read from the environment at start-up (deploy/config/payment-gateway.env).
type Config struct {
	DBMaxConns     int
	DBAcquireWait  time.Duration
	UpstreamTimeout time.Duration
}

func intEnv(key string, def int) (int, error) {
	v := os.Getenv(key)
	if v == "" {
		return def, nil
	}
	n, err := strconv.Atoi(v)
	if err != nil || n <= 0 {
		return 0, fmt.Errorf("%s must be a positive integer, got %q", key, v)
	}
	return n, nil
}

func LoadConfig() (Config, error) {
	conns, err := intEnv("DB_MAX_CONNS", 50)
	if err != nil {
		return Config{}, err
	}
	waitMs, err := intEnv("DB_ACQUIRE_TIMEOUT_MS", 2000)
	if err != nil {
		return Config{}, err
	}
	return Config{DBMaxConns: conns, DBAcquireWait: time.Duration(waitMs) * time.Millisecond, UpstreamTimeout: 3 * time.Second}, nil
}
