
var globalState = {
	selectedCell : { i : 0, j : 0},
	cellSelected : false,
    sudoku : {} };

var Sudoku = function(m, n) {
	this.m = m;
	this.n = n;
	this.grid = [];
	for(var i = 0; i < m*n; ++i) {
		row = [];
		for(var j = 0; j < n*m; ++j) {
			row.push(-1);
		}
		this.grid.push(row);
	}
}

Sudoku.prototype.show = function() {
	for(var i = 0; i < this.m * this.n; ++i) {
		for(var j = 0; j < this.m * this.n; ++j) {
			cell(i,j).innerHTML = this.grid[i][j] == -1 ? "&nbsp;" : this.grid[i][j];
		}
	}
}

function cell(i, j) {
	return document.getElementById(i + ";" + j);
}

function createHTML(m, n) {
	var table = document.createElement("table");
	// note the use of 'let' instead of 'var'
	// to get a separate copy of the variable
	// for each of the closure we create below
	// (for the events)
	for(let i = 0; i < this.m * this.n; ++i) {
		var row = document.createElement("tr");
		for(let j = 0; j < this.m * this.n; ++j) {
			var cell = document.createElement("td");
			if(i % this.m == 0) {
				cell.classList.add("thicktop");
			}
			if(j % this.n == 0) {
				cell.classList.add("thickleft");
			}
			cell.id = i + ";" + j;
			cell.addEventListener("click", function() { onClick(i,j); });
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	div = document.getElementById("sudoku");
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
	div.appendChild(table);
}

function onClick(i, j) {
	if(globalState.cellSelected) {
		cell(globalState.selectedCell.i, globalState.selectedCell.j).dataset.active = "";
	}
	globalState.cellSelected = true;
	globalState.selectedCell.i = i;
	globalState.selectedCell.j = j;
	cell(globalState.selectedCell.i, globalState.selectedCell.j).dataset.active = "active";
}

// this assumes that m*n is at most 9
function onKeypress(evt) {
	console.log("Keypress");
	if(globalState.cellSelected) {
		var i = globalState.selectedCell.i;
		var j = globalState.selectedCell.j;
		key = evt.key;
		number = Number(key);
		if(number && number <= globalState.sudoku.m * globalState.sudoku.n) {
			globalState.sudoku.grid[i][j] = number;
			cell(i,j).innerHTML = number;
		} else if (key == " " || key == "0") {
			globalState.sudoku.grid[i][j] = -1;
			cell(i,j).innerHTML = "&nbsp;";
		}
	}
}

window.onload = function() {
	m = 3;
	n = 3;
	createHTML(m, n);
	s = new Sudoku(m, n);
	s.grid[1][2] = 3;
	s.show();
	globalState.sudoku = s;
	document.addEventListener("keypress", onKeypress);
}
