
window.onload = function() {
	var m = 3;
	var n = 3;
	var s = new Sudoku(m, n);
	s.grid = [[9,1,2,3,4,5,6,7,8],
			  [-1,-1,-1,6,7,8,9,1,2],
			  [6,7,8,9,1,2,3,4,5],
	          [1,2,3,4,5,6,7,8,9],
	          [4,5,6,7,8,9,1,2,3],
	          [7,8,9,1,2,3,4,5,6],
	          [2,3,4,5,6,7,8,9,1],
	          [5,6,7,8,9,1,2,3,4],
	          [8,9,1,2,3,4,5,6,7]]
	s.given = [[false, false, false, false, false, false, false, false, false],
	           [false, false, false, false, false, false, false, false, false],
	           [false, false, false, true, true, true, true, true, true],
	           [false, false, false, false, false, false, false, false, false],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true]]
	var ui = new SudokuUI(document);
	ui.setSudoku(s);
}
