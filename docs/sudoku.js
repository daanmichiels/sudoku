
var Sudoku = function(m, n) {
	this._m = m;
	this._n = n;
	this._grid = []; //changes
	this._given = [];
	this._givens = 0;
	this._blanks = m*n*m*n; //changes
	this._cleared = false; //changes
	for(var i = 0; i < m*n; ++i) {
		var row_grid = [];
		var row_given = [];
		for(var j = 0; j < n*m; ++j) {
			row_grid.push(-1);
			row_given.push(false);
		}
		this._grid.push(row_grid);
		this._given.push(row_given);
	}
	this._callbacks = {};
};

Object.defineProperty(Sudoku.prototype, "m", {
	get : function () {
		return this._m;
	}
});

Object.defineProperty(Sudoku.prototype, "n", {
	get : function () {
		return this._n;
	}
});

Object.defineProperty(Sudoku.prototype, "blanks", {
	get : function() {
		if(this._cleared) {
			return this._m*this._m*this._n*this._n - this._givens;
		}
		return this._blanks;
	}
});

Object.defineProperty(Sudoku.prototype, "givens", {
	get : function() {
		return this._givens;
	}
});

Sudoku.prototype._save = function() {
	localStorage.setItem("sudoku", this.toString());
}

Sudoku.prototype.get = function(i,j) {
	if(this._cleared) {
		return this._given[i][j] ? this._grid[i][j] : -1;
	}
	return this._grid[i][j];
}

Sudoku.prototype.set = function(i,j,entry) {
	if(this._given[i][j]) {
		console.log("Cannot set this cell: it's a given.");
		return;
	}
	if(this._cleared) {
		for(var k=0; k<this._m * this._n; ++k) {
			for(var l=0; l<this._m*this._n; ++l) {
				if(!this._given[k][l]) {
					this._grid[k][l] = -1;
				}
			}
		}
		this._blanks = this._m*this._m*this._n*this._n - this._givens;
		this._cleared = false;
	}
	if(this._grid[i][j] != -1) {
		this._blanks++;
	}
	this._grid[i][j] = entry;
	if(entry != -1) {
		this._blanks--;
	}
	this._save();
	this._trigger("set", [i,j,entry]);
};

Sudoku.prototype.clear = function() {
	if(this._cleared) {
		console.log("Already cleared.");
		return;
	}
	this._cleared = true;
	this._save();
	this._trigger("clear");
}

Sudoku.prototype.restore = function() {
	if(!this._cleared) {
		console.log("Cannot restore this sudoku.");
		return;
	}
	this._cleared = false;
	this._save();
	this._trigger("restore");
}

Sudoku.prototype.given = function(i,j) {
	return this._given[i][j];
}

Sudoku.prototype.isSolved = function() {
	if(this.blanks > 0) {
		return false;
	}

	var m = this._m;
	var n = this._n;

	var falses = [];
	for(var j=0; j<m*n; ++j) {
		falses.push(false);
	}

	//check rows
	for(var i=0; i<m*n; ++i) {
		var found = falses.slice();
		for(var j=0; j<m*n; ++j) {
			found[this._grid[i][j]-1] = true;
		}
		if(found.indexOf(false) != -1) {
			return false;
		}
	}

	//check columns
	for(var i=0; i<m*n; ++i) {
		var found = falses.slice();
		for(var j=0; j<m*n; ++j) {
			found[this._grid[j][i]-1] = true;
		}
		if(found.indexOf(false) != -1) {
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
					found[this._grid[i][j]-1] = true;
				}
			}
			if(found.indexOf(false) != -1) {
				return false;
			}
		}
	}

	return true;
};

Sudoku.prototype.toString = function() {
	var str = "";
	str += this._m.toString() + "x" + this._n.toString() + ":";
	if(this._cleared) {
		str += "cleared";
	}
	str += ":";
	for(var i = 0; i<this._m*this._n; ++i) {
		for(var j=0; j<this._m*this._n; ++j) {
			str += (this._grid[i][j] == -1 ? "." : this._grid[i][j].toString());
		}
	}
	str += ":";
	for(var i = 0; i<this._m*this._n; ++i) {
		for(var j=0; j<this._m*this._n; ++j) {
			str += (this._given[i][j] ? "-" : ".");
		}
	}
	return str;
}

Sudoku.prototype.registerCallback = function(event, callback) {
	if(!this._callbacks[event]) {
		this._callbacks[event] = [];
	}
	this._callbacks[event].push(callback);
}

Sudoku.prototype._trigger = function(event, args) {
	if(!this._callbacks[event]) {
		return;
	}
	for(callback of this._callbacks[event]) {
		callback.apply(undefined, args);
	}
}

Sudoku.prototype.explain = function() {
	prettyprint("The _sudoku_ object is of class _Sudoku_.");
	prettyprint("The following properties are exposed:");
	prettyprint(" - _m_: the height of a block (typically 3); readonly");
	prettyprint(" - _n_: the width of a block (typically 3); readonly");
	prettyprint(" - _blanks_: the number of blanks remaining; readonly");
	prettyprint(" - _givens_: the number of givens in the sudoku");
	prettyprint(" - _get(i,j)_: gets the entry at position (i,j); -1 represents an empty cell");
	prettyprint(" - _set(i,j,value)_: sets the entry at position (i,j); -1 represents an empty cell");
	prettyprint(" - _clear()_: clears the sudoku, so that only the givens are set");
	prettyprint(" - _restore()_: restores a previously cleared sudoku; this only if no _set_ or");
	prettyprint("              _restore_ calls have been made since the last clear_");
	prettyprint(" - _given(i,j)_: checks whether cell (i,j) was a given");
	prettyprint(" - _isSolved()_: checks whether the sudoko is solved");
	prettyprint(" - _toString()_: return a string representation of the sudoku");
	prettyprint(" - _registerCallback()_: for registering callback that will be called when the");
	prettyprint("                       the sudoku is changed");
	prettyprint(" - _explain()_: give this explanation");
	prettyprint("");
	prettyprint("Cells are numbered by a pair _(i,j)_, where _i_ is the number of the row,");
	prettyprint("and _j_ is the number of the column. Both of these are 0-based.");
	prettyprint("");
	prettyprint("The class _Sudoku_ also has a static method _Sudoku.create(level)_, which");
	prettyprint("creates a sudoku of the given level.");
	prettyprint("Available levels are ");
	for(var level of Object.keys(puzzles)) {
		prettyprint(" - " + level);
	}
}

Sudoku.create = function(level) {

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

	var gridstrings = puzzles[level];
	var gridstring = gridstrings[Math.floor(Math.random() * gridstrings.length)];

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

	var s = new Sudoku(3,3);
	// fill grid
	for(var i=0; i<9; ++i) {
		for(var j=0; j<9; ++j) {
			var entry = toEntry(gridstring[9*i+j]);
			if(entry == -1) {
				s._grid[rows[i]][cols[j]] = -1;
			} else {
				s._grid[rows[i]][cols[j]] = digits[entry-1];
			}
			s._grid[rows[i]][cols[j]] = (entry == -1) ? -1 : digits[entry-1];
		}
	}

	// mark givens
	var givenscount = 0;
	for(var i=0; i<9; ++i) {
		for(var j=0; j<9; ++j) {
			s._given[i][j] = (s._grid[i][j] != -1);
			givenscount += (s._grid[i][j] != -1 ? 1 : 0);
		}
	}
	s._blanks = 81 - givenscount;
	s._givens = givenscount;
	return s;
}


