package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/smelton01/scan-doku/handler"
	"github.com/smelton01/scan-doku/solver"
)

func main() {
	testGrid := &solver.Grid{
		Rows:     9,
		Cols:     9,
		Elements: make([]int, 81),
	}
	init := [][]int{{5, 5}, {7, 1}, {9, 8}, {11, 3}, {15, 7}, {19, 9}, {23, 2}, {25, 3}, {27, 5}, {29, 6}, {51, 3}, {53, 9}, {55, 3},
		{57, 9}, {61, 8}, {65, 7}, {69, 9}, {71, 2}, {73, 6}, {75, 7}}

	// init test grid
	for _, pos := range init {
		index, val := pos[0], pos[1]
		testGrid.Elements[index] = val
	}

	testGrid.Solve()

	s := &handler.Server{
		Steps: testGrid.Steps,
	}
	r := mux.NewRouter()
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/", s.ServeHTTP)
	log.Println("Listening on port: 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
