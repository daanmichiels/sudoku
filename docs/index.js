var sudoku;
var ui;

window.onload = function() {
	sudoku = Sudoku.create("trivial");
	ui = new SudokuUI(document);
	ui.setSudoku(sudoku);

	prettyprint("This webpage exposes some useful Javascript functions for your use in the console.");
	prettyprint("Use _explain()_ to get help.");
}
