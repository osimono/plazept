package main

import (
	"github.com/boltdb/bolt"
	"github.com/gorilla/mux"
	"github.com/osimono/plazept/cmd/backend/api"
	mybolt "github.com/osimono/plazept/cmd/bolt"
	"golang.org/x/net/http2"
	"log"
	"net/http"
	"time"
)

func main() {
	db, err := bolt.Open("plazept-prod.db", 0600, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	store := mybolt.NewStore(db)

	itemHandler := api.ItemHandler{Store: store}

	r := mux.NewRouter()
	api := r.PathPrefix("/api/").Subrouter()
	api.Handle("/items", itemHandler)

	srv := &http.Server{
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
		// Good practice: enforce timeouts for servers you create!
	}
	http2.ConfigureServer(srv, nil)
	log.Fatal(http.ListenAndServeTLS("localhost:9000", "tls/server.crt", "tls/server.key", r))
}
