package main

import "testing"

func TestDefaults(t *testing.T) {
	t.Setenv("DB_MAX_CONNS", "")
	cfg, err := LoadConfig()
	if err != nil || cfg.DBMaxConns != 50 {
		t.Fatalf("want default 50, got %d (%v)", cfg.DBMaxConns, err)
	}
}

func TestRejectsNonPositive(t *testing.T) {
	t.Setenv("DB_MAX_CONNS", "0")
	if _, err := LoadConfig(); err == nil {
		t.Fatal("want error for 0")
	}
}

func TestPoolTimesOutWhenFull(t *testing.T) {
	p := NewPool(1)
	release, err := p.Acquire(t.Context(), 10_000_000)
	if err != nil {
		t.Fatal(err)
	}
	defer release()
	if _, err := p.Acquire(t.Context(), 10_000_000); err != errPoolTimeout {
		t.Fatalf("want pool timeout, got %v", err)
	}
}
