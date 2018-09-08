package main

import (
	"fmt"
	"golang.org/x/net/http2"
	"log"
	"net/http"
	"time"
)

func main() {
	srv := &http.Server{
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
		// Good practice: enforce timeouts for servers you create!
	}

	http2.ConfigureServer(srv, nil)
	log.Fatal(http.ListenAndServeTLS("localhost:9000", "tls/server.crt", "tls/server.key", HelloWorldHandler{}))
}

type HelloWorldHandler struct{}

func (h HelloWorldHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "you requested: "+r.URL.EscapedPath())
}
