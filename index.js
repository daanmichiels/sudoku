
window.onload = function() {
	var m = 3;
	var n = 3;
	var s = new Sudoku(m, n);
	s.grid = [[9,1,-1,-1,4,-1,-1,-1,-1],
	          [1,2,3,4,5,6,7,8,9],
	          [2,3,4,5,6,7,8,9,1],
	          [3,4,5,6,7,8,9,1,2],
	          [4,5,6,7,8,9,1,2,3],
	          [5,6,7,8,9,1,2,3,4],
	          [6,7,8,9,1,2,3,4,5],
	          [7,8,9,1,2,3,4,5,6],
	          [8,9,1,2,3,4,5,6,7]]
	s.given = [[true, true, false, false, false, false, false, false, false],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true]]
	var ui = new SudokuUI(document);
	ui.setSudoku(s);
}
