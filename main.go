package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/smelton01/scan-doku/handler"
)

func main() {
	s := &handler.Server{}
	r := mux.NewRouter()
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/", s.ServeHTTP)
	log.Println("Listening on port: 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
