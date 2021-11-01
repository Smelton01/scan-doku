package handler

import (
	"encoding/json"
	"net/http"
)

type Server struct {
	Steps [][]int
	Final []int
}

type Response struct {
	Steps [][]int `json:"steps"`
	Init  [][]int `json:"init"`
	Final []int   `json:"final"`
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	init := [][]int{{5, 5}, {7, 1}, {9, 8}, {11, 3}, {15, 7}, {19, 9}, {23, 2}, {25, 3}, {27, 5}, {29, 6}, {51, 3}, {53, 9}, {55, 3},
		{57, 9}, {61, 8}, {65, 7}, {69, 9}, {71, 2}, {73, 6}, {75, 7}}

	resp := &Response{Steps: s.Steps, Init: init, Final: s.Final}
	res, err := json.Marshal(resp)
	if err != nil {
		panic(err)
	}
	w.Write(res)
}
