
var Sudoku = function(m, n) {
	this.m = m;
	this.n = n;
	this.grid = [];
	this.given = [];
	for(var i = 0; i < m*n; ++i) {
		var row_grid = [];
		var row_given = [];
		for(var j = 0; j < n*m; ++j) {
			row_grid.push(-1);
			row_given.push(false);
		}
		this.grid.push(row_grid);
		this.given.push(row_given);
	}
};

Sudoku.prototype.correct = function() {
	var m = this.m;
	var n = this.n;

	//check rows
	for(var i=0; i<m*n; ++i) {
		var found = [];
		for(var j=0; j<m*n; ++j) {
			found.push(false);
		}
		for(var j=0; j<m*n; ++j) {
			found[this.grid[i][j]-1] = true;
		}
		for(var j=0; j<m*n; ++j) {
			if(!found[j]) {
				console.log(j + " not found on row " + i);
				return false;
			}
		}
	}

	//check columns
	for(var i=0; i<m*n; ++i) {
		var found = [];
		for(var j=0; j<m*n; ++j) {
			found.push(false);
		}
		for(var j=0; j<m*n; ++j) {
			found[this.grid[j][i]-1] = true;
		}
		for(var j=0; j<m*n; ++j) {
			if(!found[j]) {
				console.log(j + " not found in column " + i);
				return false;
			}
		}
	}

	return true;
};


