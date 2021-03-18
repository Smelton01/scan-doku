class Cell():
    def __init__(self, i,j, n):
        self.value = -1
        self.pos = (i,j)
        self.num = n

steps = []

#grouping all the 3x3 subcells
def sub_group(start):
    op = []
    for i in range(3):
        op += [j+9*i for j in [start, start+1, start+2]]
    return op

sub_list = [0, 3, 6, 27, 30, 33, 54, 57, 60]
subs = {}

for i, j in enumerate(sub_list):
    subs[i] = sub_group(j)

def checker(grid, curr, element): 
    row, col = curr//9, curr%9
    block = [k for k,v in subs.items() if curr in v][0]
    #check the 3x3 blockk
    for c in subs[block]:
        if c == curr:
            continue
        if element == grid[c].value:
            return False
    #check the row 
    for q in range(9):
        if element == grid[9*row+q].value:
            return False
    #check the col
    for q in range(9):
        if element == grid[9*q+col].value:
            return False
    return True

def find_empty(grid):
    emp = []
    for c in range(len(grid)):
        if grid[c].value == -1:
            emp.append(c)
    return emp 

def backtrack(grid):
    #find empty location
    emp = find_empty(grid)
    if not emp:
        #print_grid(grid)
        return True

    for i in range(1,10):  
        if checker(grid, grid[emp[0]].num, i):
            grid[emp[0]].value = i 
            steps.append([emp[0],i])
            if backtrack(grid):
                return True
            grid[emp[0]].value = -1
            steps.append([emp[0],-1])
    return False
        
#A Utility Function to print the Grid
def print_grid(grid):
    for i in range(len(grid)):
        #if i%3 == 0:
        #    print ('|', end="")
        print("[",grid[i].value,"]", end=""),
        if i%9 == 8:
            print("\n")


def main():
    #all 81 cells inialized as a list of cell objects with position i,j
    grid = {}
    for i in range(81):
        grid[i] = Cell(i//9, i%9, i)

    test = [(5,5), (7,1), (9,8), (11, 3,), (15,7), (19,9), (23,2), (25,3), (27,5), (29,6), (51,3), (53,9), (55,3),
            (57,9), (61,8), (65,7), (69,9), (71,2), (73,6), (75,7)]
            
    init = []
    for i in range(81):
        init.append(0)

    for pair in test:
        init[pair[0]] = pair[1]

    for p, v in test:
        grid[p].value = v
    # print(init)
    #print_grid(grid)
    if backtrack(grid):
        pass
    f_steps, b_steps = [], []
    sub, back = [], []
    for s in steps:
        if s[1] == -1:
            if sub: 
                f_steps.append(sub)
            sub = []
            continue
        sub.append(s)
    
    for s in steps:
        if s[1] != -1:
            if back: 
                b_steps.append(back)
            back = []
            continue
        back.append(s)
    refined_steps = []
    for i in range(len(b_steps)):
        refined_steps.append(f_steps[i])
        refined_steps.append(b_steps[i])
    print(len(refined_steps), refined_steps[:5])
    final_state = [grid[i].value for i in range(len(grid))]
    return {"steps": steps, "init": init, "refined": refined_steps, "final": final_state}

if __name__ == "__main__":
    main()