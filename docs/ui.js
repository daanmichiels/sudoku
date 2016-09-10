
var SudokuUI = function(doc) {
	this.doc = doc;
	this.cellSelected = false;
	this.selectedCell = { i : 0, j : 0 };

	var ui = this;
	this.doc.addEventListener("keypress", function(evt) { ui.handleKeypress(evt); });
	this.doc.addEventListener("keydown", function(evt) { ui.handleKeydown(evt); });

	var newbutton = this.doc.getElementById("new");
	var restartbutton = this.doc.getElementById("restart");
	newbutton.addEventListener("click", function(evt) { ui.newPuzzle(); });
	restartbutton.addEventListener("click", function(evt) { ui.restartPuzzle(); });
};

SudokuUI.prototype.newPuzzle = function() {
	console.log("New puzzle");
	var s = new Sudoku(3,3);
	var level = this.doc.getElementById("level").value;
	level = Number(level);
	s = createSudoku(level);
	var winbox = this.doc.getElementById("winbox");
	if(winbox) {
		this.doc.body.removeChild(winbox);
	}
	this.setSudoku(s);
}

SudokuUI.prototype.restartPuzzle = function() {
	console.log("Restart puzzle");
	if(!this.sudoku) {
		return;
	}
	var s = this.sudoku;
	for(var i=0; i<s.m*s.n; ++i) {
		for(var j=0; j<s.m*s.n; ++j) {
			if(!s.given[i][j]) {
				s.grid[i][j] = -1;
				this.cell(i,j).innerHTML = "&nbsp;";
			}
		}
	}
	this.cell(this.selectedCell.i, this.selectedCell.j).dataset.active = "";
	this.cellSelected = false;
	this.selectedCell = { i : 0, j : 0 };
	var winbox = this.doc.getElementById("winbox");
	if(winbox) {
		this.doc.body.removeChild(winbox);
	}
}

SudokuUI.prototype.cell = function(i, j) {
	return this.doc.getElementById(i + ";" + j);
};

SudokuUI.prototype.setSudoku = function(s) {
	this.sudoku = s;
	this.createHTML();
	this.cellSelected = false;
	this.selectedCell = { i : 0, j : 0 };

	this.blanks = this.sudoku.m * this.sudoku.n * this.sudoku.m * this.sudoku.n;
	for(var i = 0; i < this.sudoku.m * this.sudoku.n; ++i) {
		for(var j = 0; j < this.sudoku.m * this.sudoku.n; ++j) {
			if(this.sudoku.grid[i][j] == -1) {
				this.cell(i,j).innerHTML = "&nbsp;";
			} else {
				this.cell(i,j).innerHTML = this.sudoku.grid[i][j];
				this.blanks--;
			}
			if(this.sudoku.given[i][j]) {
				this.cell(i,j).dataset.given = "given";
			}
		}
	}
};

SudokuUI.prototype.handleClick = function(i, j) {
	if(this.cellSelected) {
		this.cell(this.selectedCell.i, this.selectedCell.j).dataset.active = "";
	}
	this.cellSelected = true;
	this.selectedCell.i = i;
	this.selectedCell.j = j;
	this.cell(this.selectedCell.i, this.selectedCell.j).dataset.active = "active";
};

SudokuUI.prototype.createHTML = function() {
	if(!this.sudoku) {
		throw "Cannot createHTML when no sudoku is set.";
	}

	var m = this.sudoku.m;
	var n = this.sudoku.n;

	var ui = this;
	var table = this.doc.createElement("table");
	// note the use of 'let' instead of 'var'
	// to get a separate copy of the variable
	// for each of the closure we create below
	// (for the events)
	for(let i = 0; i < m*n; ++i) {
		var row = this.doc.createElement("tr");
		for(let j = 0; j < m*n; ++j) {
			var cell = this.doc.createElement("td");
			if(i % m == 0) {
				cell.classList.add("thicktop");
			}
			if(j % n == 0) {
				cell.classList.add("thickleft");
			}
			cell.id = i + ";" + j;
			cell.addEventListener("click", function() { ui.handleClick(i,j); });
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	var div = this.doc.getElementById("sudoku");
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
	div.appendChild(table);
};

SudokuUI.prototype.win = function() {
	if(this.cellSelected) {
		this.cell(this.selectedCell.i, this.selectedCell.j).dataset.active = "";
		this.cellSelected = false;
	}
	var winbox = this.doc.createElement("div");
	var wintext = this.doc.createElement("span");
	winbox.classList.add("winbox");
	wintext.classList.add("wintext");
	wintext.innerHTML = "Solved!";
	var ui = this;
	winbox.id = "winbox";
	winbox.addEventListener("click", function() { ui.doc.body.removeChild(winbox); });
	this.doc.body.appendChild(winbox);
	winbox.appendChild(wintext);
}

SudokuUI.prototype.handleKeypress = function(evt) {
	if(!this.cellSelected) {
		return;
	}
	var i = this.selectedCell.i;
	var j = this.selectedCell.j;
	if(this.cell(i,j).dataset.given == "given") {
		return;
	}
	var key = evt.key;
	var number = Number(key);
	if(number && number <= this.sudoku.m * this.sudoku.n) {
		if(this.sudoku.grid[i][j] != -1) {
			this.blanks++;
		}
		this.sudoku.grid[i][j] = number;
		this.blanks--;
		this.cell(i,j).innerHTML = number;

		if(this.blanks == 0) {
			if(this.sudoku.isSolved()) {
				this.win();
			}
		}

	} else if (key == " " || key == "0") {
		if(this.sudoku.grid[i][j] != -1) {
			this.blanks++;
		}
		this.sudoku.grid[i][j] = -1;
		this.cell(i,j).innerHTML = "&nbsp;";
	}
};

SudokuUI.prototype.handleKeydown = function(evt) {
	if(this.cellSelected) {
		var i = this.selectedCell.i;
		var j = this.selectedCell.j;
		this.cell(i,j).dataset.active = "";
		var m = this.sudoku.m;
		var n = this.sudoku.n;
		switch(evt.keyCode) {
			case 37:
				j -= 1;
				break;
			case 38:
				i -= 1;
				break;
			case 39:
				j += 1;
				break;
			case 40:
				i += 1;
				break;
			case 46: //delete
			case 8:  //backspace
				if(this.sudoku.grid[i][j] != -1) {
					this.blanks++;
				}
				this.sudoku.grid[i][j] = -1;
				this.cell(i,j).innerHTML = "&nbsp;";
				break;
			default:
				break;
		}
		if(i < 0) i=0;
		if(i >= m*n) i = m*n-1;
		if(j < 0) j=0;
		if(j >= m*n) j = m*n-1;
		this.selectedCell.i = i;
		this.selectedCell.j = j;
		this.cell(i,j).dataset.active = "active";
	}
};


