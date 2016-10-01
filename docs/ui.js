
var SudokuUI = function(element) {
	this._root = element;
	this._root.innerHTML = "";

	var ui = this;
	document.addEventListener("keypress", function(evt) { ui.handleKeypress(evt); });
	document.addEventListener("keydown", function(evt) { ui.handleKeydown(evt); });

	this._newbutton = document.createElement("button");
	this._newbutton.innerHTML = "New";
	this._newbutton.id = "new";
	this._newbutton.addEventListener("click", function(evt) { ui.newPuzzle(); });

	this._restartbutton = document.createElement("button");
	this._restartbutton.innerHTML = "Restart";
	this._restartbutton.id = "restart";
	this._restartbutton.addEventListener("click", function(evt) { ui.restartPuzzle(); });

	this._restorebutton = document.createElement("button");
	this._restorebutton.innerHTML = "Restore";
	this._restorebutton.id = "restore";
	this._restorebutton.addEventListener("click", function(evt) { ui.restorePuzzle(); });
	this._restorebutton.style.visibility = "hidden";

	this._levelselect = document.createElement("select");
	this._levelselect.id = "level";
	var levelnames = ["trivial", "level1", "level2", "level3", "level4", "level5"];
	var leveldescriptions = ["Trivial", "Easy", "Normal", "Hard", "Very hard", "Insane"];
	for(var i=0; i<levelnames.length; ++i) {
		var option = document.createElement("option");
		option.value = levelnames[i];
		option.innerHTML = leveldescriptions[i];
		this._levelselect.appendChild(option);
	}
	this._levelselect.addEventListener("click", function(evt) {evt.stopPropagation(); });

	this._root.appendChild(this._newbutton);
	this._root.appendChild(this._restartbutton);
	this._root.appendChild(this._restorebutton);
	this._root.appendChild(this._levelselect);

	document.addEventListener("click", function(evt) { ui.deselectCell(); });

	this.loadPuzzle();
};

SudokuUI.prototype.deselectCell = function() {
	if(!this._cellSelected) {
		return;
	}
	this._cells[this._selectedCell.i][this._selectedCell.j].dataset.active = "";
	this._cellSelected = false;
}

SudokuUI.prototype.handleSet = function(i,j,value) {
	this._cells[i][j].innerHTML = (value == -1 ? "&nbsp;" : value);
	this._restorebutton.style.visibility = "hidden";
	this._restartbutton.style.visibility = "visible";
}

SudokuUI.prototype.handleClear = function() {
	for(var i=0; i<this._sudoku.m*this._sudoku.n; ++i) {
		for(var j=0; j<this._sudoku.m*this._sudoku.n; ++j) {
			this.handleSet(i,j,this._sudoku.get(i,j));
		}
	}
	this._restorebutton.style.visibility = "visible";
	this._restartbutton.style.visibility = "hidden";
}

SudokuUI.prototype.handleRestore = function() {
	for(var i=0; i<this._sudoku.m*this._sudoku.n; ++i) {
		for(var j=0; j<this._sudoku.m*this._sudoku.n; ++j) {
			this.handleSet(i,j,this._sudoku.get(i,j));
		}
	}
	this._restorebutton.style.visibility = "hidden";
	this._restartbutton.style.visibility = "visible";
}


SudokuUI.prototype.loadPuzzle = function() {
	var s = Sudoku.load();
	if(!s) {
		this.newPuzzle();
	}
	else {
		this._sudoku = s;
		this.initPuzzle();
	}
}

SudokuUI.prototype.newPuzzle = function() {
	var level = this._levelselect.value;
	this._sudoku = Sudoku.create(level);
	this.initPuzzle();
}

SudokuUI.prototype.initPuzzle = function() {
	var ui = this;
	this._sudoku.registerCallback("set", function(i,j,value) { ui.handleSet(i,j,value); });
	this._sudoku.registerCallback("clear", function(i,j,value) { ui.handleClear(); });
	this._sudoku.registerCallback("restore", function(i,j,value) { ui.handleRestore(); });

	this._cellSelected = false;
	this._selectedCell = { i : 0, j : 0 };

	// remove old grid
	if(this._table) {
		this._root.removeChild(this._table);
	}

	// create new grid
	var ui = this;
	var m = this._sudoku.m;
	var n = this._sudoku.n;
	this._cells = [];
	this._table = document.createElement("table");
	this._table.id = "grid";
	for(let i=0; i<m*n; ++i) {
		this._cells.push([]);
		var row = document.createElement("tr");
		this._table.appendChild(row);
		for(let j=0; j<m*n; ++j) {
			var cell = document.createElement("td");
			this._cells[i].push(cell);
			row.appendChild(cell);

			cell.addEventListener("click", function(evt) { ui.handleCellClick(evt, i,j); });
			if(i%m == 0) {
				cell.classList.add("thicktop");
			}
			if(j%n == 0) {
				cell.classList.add("thickleft");
			}

			if(this._sudoku.given(i,j)) {
				cell.classList.add("given");
			}
		}
	}
	this._root.appendChild(this._table);

	for(var i=0; i<this._sudoku.m*this._sudoku.n; ++i) {
		for(var j=0; j<this._sudoku.m*this._sudoku.n; ++j) {
			this.handleSet(i,j,this._sudoku.get(i,j));
		}
	}

	this._restorebutton.style.visibility = (this._sudoku);
	this._restartbutton.style.visibility = (this._sudoku.givens + this._sudoku.blanks == m*m*n*n ? "hidden" : "visible");
};

SudokuUI.prototype.restartPuzzle = function() {
	this._sudoku.clear();
};

SudokuUI.prototype.restorePuzzle = function() {
	this._sudoku.restore();
};

SudokuUI.prototype.handleCellClick = function(evt, i, j) {
	if(this._cellSelected) {
		this._cells[this._selectedCell.i][this._selectedCell.j].dataset.active = "";
	}
	this._cellSelected = true;
	this._selectedCell.i = i;
	this._selectedCell.j = j;
	this._cells[this._selectedCell.i][this._selectedCell.j].dataset.active = "active";
	evt.stopPropagation(); // don't propagate to a click on the document

};

SudokuUI.prototype.handleKeypress = function(evt) {
	if(!this._cellSelected) {
		return;
	}
	var i = this._selectedCell.i;
	var j = this._selectedCell.j;
	if(this._sudoku.given(i,j)) {
		return;
	}
	var key = evt.key;
	var number = Number(key);
	if(number && number <= this._sudoku.m * this._sudoku.n) {
		this._sudoku.set(i,j,number);
	} else if (key == " " || key == "0") {
		this._sudoku.set(i,j,-1);
	}
};

SudokuUI.prototype.handleKeydown = function(evt) {
	if(this._cellSelected) {
		var i = this._selectedCell.i;
		var j = this._selectedCell.j;
		this._cells[i][j].dataset.active = "";
		var m = this._sudoku.m;
		var n = this._sudoku.n;
		switch(evt.keyCode) {
			case 37: //left
				j -= 1;
				break;
			case 38: //up
				i -= 1;
				break;
			case 39: //right
				j += 1;
				break;
			case 40: //down
				i += 1;
				break;
			case 46: //delete
			case 8:  //backspace
				this._sudoku.set(i,j,-1);
				break;
			case 27: //escape
				this.deselectCell();
				return;
			default:
				break;
		}
		if(i < 0) i=0;
		if(i >= m*n) i = m*n-1;
		if(j < 0) j=0;
		if(j >= m*n) j = m*n-1;
		this._selectedCell.i = i;
		this._selectedCell.j = j;
		this._cells[i][j].dataset.active = "active";
	}
};


