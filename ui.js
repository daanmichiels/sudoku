
var SudokuUI = function(doc) {
	this.doc = doc;
	this.cellSelected = false;
	this.selectedCell = { i : 0, j : 0 };

	var ui = this;
	this.doc.addEventListener("keypress", function(evt) { ui.handleKeypress(evt); });
	this.doc.addEventListener("keydown", function(evt) { ui.handleKeydown(evt); });
};

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
	console.log("Click (" + i + ", " + j + ")");
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

	m = this.sudoku.m;
	n = this.sudoku.n;

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
	div = this.doc.getElementById("sudoku");
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
	div.appendChild(table);
};

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
		this.sudoku.grid[i][j] = number;
		this.cell(i,j).innerHTML = number;
	} else if (key == " " || key == "0") {
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


