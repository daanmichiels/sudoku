
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

	var falses = [];
	for(var j=0; j<m*n; ++j) {
		falses.push(false);
	}

	//check rows
	for(var i=0; i<m*n; ++i) {
		var found = falses.slice();
		for(var j=0; j<m*n; ++j) {
			found[this.grid[i][j]-1] = true;
		}
		if(found.indexOf(false) != -1) {
			console.log("Row " + i + " failed.");
			return false;
		}
	}

	//check columns
	for(var i=0; i<m*n; ++i) {
		var found = falses.slice();
		for(var j=0; j<m*n; ++j) {
			found[this.grid[j][i]-1] = true;
		}
		if(found.indexOf(false) != -1) {
			console.log("Column " + i + " failed.");
			return false;
		}
	}

	//check blocks
	for(var a=0; a<n; ++a) {
		for(var b=0; b<m; ++b) {
			var found = falses.slice();
			for(var k=0; k<m; ++k) {
				for(var l=0; l<n; ++l) {
					var i = a * m + k;
					var j = b * n + l;
					found[this.grid[i][j]-1] = true;
				}
			}
			if(found.indexOf(false) != -1) {
				console.log("Block (" + a + ", " + b + ") failed.");
				return false;
			}
		}
	}

	return true;
};


