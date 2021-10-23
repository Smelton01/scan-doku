package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type server struct{}

type Response struct {
	Steps [][]int `json:"steps"`
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	steps := [][]int{{0, 2}, {1, 4}, {1, -1}, {1, 7}, {2, 4}, {3, 3}, {4, 6}, {6, 8}, {6, -1}, {4, -1}, {4, 8}, {6, 6}, {6, -1}, {4, -1}, {4, 9}, {6, 6}, {8, 8}, {10, 1}, {12, 4}, {13, 6}, {13, -1}, {12, -1}, {12, 6}, {13, 4}, {13, -1}, {12, -1}, {10, -1}, {10, 5}, {12, 1}, {13, 4}, {14, 6}, {16, 2}, {16, -1}, {16, 9}, {16, -1}, {14, -1}, {13, -1}, {13, 6}, {14, 4}, {16, 2}, {16, -1}, {16, 9}, {16, -1}, {14, -1}, {13, -1}, {12, -1}, {12, 4}, {13, 1}, {14, 6}, {16, 2}, {16, -1}, {16, 9}, {16, -1}, {14, -1}, {13, -1}, {13, 6}, {14, 1}, {16, 2}, {16, -1}, {16, 9}, {16, -1}, {14, -1}, {13, -1}, {12, -1}, {12, 6}, {13, 1}, {14, 4}, {16, 2}, {16, -1}, {16, 9}, {16, -1}, {14, -1}, {13, -1}, {13, 4}, {14, 1}, {16, 2}, {16, -1}, {16, 9}, {16, -1}, {14, -1}, {13, -1}, {12, -1}, {10, -1}, {8, -1}, {6, -1}, {6, 8}, {8, 6}, {10, 1}, {12, 4}, {13, 6}, {13, -1}, {12, -1}, {12, 6}, {13, 4}, {13, -1}, {12, -1}, {10, -1}, {10, 5}, {12, 1}, {13, 4}}
	resp := &Response{Steps: steps}
	res, err := json.Marshal(resp)
	if err != nil {
		panic(err)
	}
	w.Write(res)
}

func main() {
	s := &server{}
	r := mux.NewRouter()
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/", s.ServeHTTP)
	log.Println("Listening on port: 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
