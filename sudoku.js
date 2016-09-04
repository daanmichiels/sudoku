
var Sudoku = function(m, n) {
	this.m = m;
	this.n = n;
	this.grid = [];
	this.given = [];
	for(var i = 0; i < m*n; ++i) {
		row_grid = [];
		row_given = [];
		for(var j = 0; j < n*m; ++j) {
			row_grid.push(-1);
			row_given.push(false);
		}
		this.grid.push(row_grid);
		this.given.push(row_given);
	}
};


