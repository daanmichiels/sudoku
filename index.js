
window.onload = function() {
	m = 3;
	n = 3;
	s = new Sudoku(m, n);
	s.grid = [[5,3,-1,-1,7,-1,-1,-1,-1],
	          [1,2,3,4,5,6,7,8,9],
	          [1,2,3,4,5,6,7,8,9],
	          [1,2,3,4,5,6,7,8,9],
	          [1,2,3,4,5,6,7,8,9],
	          [1,2,3,4,5,6,7,8,9],
	          [1,2,3,4,5,6,7,8,9],
	          [1,2,3,4,5,6,7,8,9],
	          [1,2,3,4,5,6,7,8,9]]
	s.given = [[true, true, false, false, false, false, false, false, false],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true],
	           [true, true, true, true, true, true, true, true, true]]
	ui = new SudokuUI(document);
	ui.setSudoku(s);
}
