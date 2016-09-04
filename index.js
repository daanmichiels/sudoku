
window.onload = function() {
	var s = new Sudoku(3, 3);
	s.grid = puzzles[0];
	for(var i=0; i<9; ++i) {
		for(var j=0; j<9; ++j) {
			s.given[i][j] = (s.grid[i][j] != -1);
		}
	}
	var ui = new SudokuUI(document);
	ui.setSudoku(s);
}
