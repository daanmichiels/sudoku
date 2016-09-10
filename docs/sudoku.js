
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

function createSudoku(level) {

	var toEntry = function(t) {
		var numbers = ["1","2","3","4","5","6","7","8","9"];
		var idx = numbers.indexOf(t);
		if(idx == -1) {
			return -1;
		}
		return idx + 1;
	}

	// in-place (!) shuffle
	var shuffle = function(arr) {
		for(var i=arr.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i+1));
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	}

	var permutationOfThree = function() {
		var three = [0,1,2];
		return shuffle(three);
	}

	var gridstrings = puzzles["level"+level];
	console.log("Picking from " + gridstrings.length + " puzzles.");
	var gridstring = gridstrings[Math.floor(Math.random() * gridstrings.length)];
	console.log("Picked " + gridstring);

	// permute rows
	var blocks = [ permutationOfThree(), permutationOfThree(), permutationOfThree() ];
	var blockperm = permutationOfThree();
	var rows = [];
	for(var k=0; k<3; ++k) {
		for(var l=0; l<3; ++l) {
			rows.push(3*blockperm[k]+blocks[k][l]);
		}
	}

	// permute cols
	blocks = [ permutationOfThree(), permutationOfThree(), permutationOfThree() ];
	blockperm = permutationOfThree();
	var cols = [];
	for(var k=0; k<3; ++k) {
		for(var l=0; l<3; ++l) {
			cols.push(3*blockperm[k]+blocks[k][l]);
		}
	}

	// rename digits
	digits = [1,2,3,4,5,6,7,8,9];
	shuffle(digits);
	console.log(digits);

	var s = new Sudoku(3,3);
	// fill grid
	for(var i=0; i<9; ++i) {
		for(var j=0; j<9; ++j) {
			var entry = toEntry(gridstring[9*i+j]);
			s.grid[rows[i]][cols[j]] = (entry == -1) ? -1 : digits[entry-1];
		}
	}

	// mark givens
	for(var i=0; i<9; ++i) {
		for(var j=0; j<9; ++j) {
			s.given[i][j] = (s.grid[i][j] != -1);
		}
	}
	return s;
}

Sudoku.prototype.isSolved = function() {
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


