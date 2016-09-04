
window.onload = function() {
	m = 3;
	n = 3;
	s = new Sudoku(m, n);
	s.grid[1][2] = 3;
	s.given[1][2] = true;
	ui = new SudokuUI(document);
	ui.setSudoku(s);
}
