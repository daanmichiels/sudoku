
window.onload = function() {
	var s = createSudoku(1);
	var ui = new SudokuUI(document);
	ui.setSudoku(s);
}
