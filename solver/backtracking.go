package solver

type Grid struct {
	Elements []int
	Rows     int
	Cols     int
	Steps    [][]int
}

func (g *Grid) Solve() bool {
	for index := range g.Elements {
		if g.Elements[index] == 0 {
			for num := 1; num < 10; num++ {
				if g.possible(index/g.Cols, index%g.Cols, num) {
					g.Elements[index] = num
					g.Steps = append(g.Steps, []int{index, num})
					if g.Solve() {
						return true
					}
					g.Elements[index] = 0
					g.Steps = append(g.Steps, []int{index, 0})
				}
			}
			return false
		}
	}
	return true
}

func (g *Grid) possible(y, x, num int) bool {
	// check row
	for i := y * 9; i < y*9+9; i++ {
		if g.Elements[i] == num {
			return false
		}
	}
	// check col
	for i := x; i < g.Rows*g.Cols; i += g.Cols {
		if g.Elements[i] == num {
			return false
		}
	}
	// check box
	x0, y0 := (x/3)*3, (y/3)*3
	for i := range [3]struct{}{} {
		for j := range [3]struct{}{} {
			index := (y0+i)*g.Cols + (x0 + j)
			if g.Elements[index] == num {
				return false
			}
		}
	}
	return true
}
