

var Sudoku = function(m, n) {
	this.m = m;
	this.n = n;
	this.grid = [];
	for(var i = 0; i < m*n; ++i) {
		row = [];
		for(var j = 0; j < n*m; ++j) {
			row.push(-1);
			console.log('YO');
		}
		this.grid.push(row);
		console.log(row.length);
	}
}

Sudoku.prototype.show = function() {
	for(var i = 0; i < this.m * this.n; ++i) {
		for(var j = 0; j < this.m * this.n; ++j) {
			var cell = document.getElementById(i + ";" + j);
			cell.innerHTML = this.grid[i][j] == -1 ? "&nbsp;" : this.grid[i][j];
		}
	}
}

var onMouseEnter = function(i, j) {
	var cell = document.getElementById(i + ";" + j);
	cell.classList.add("hover-strong");
}

var onMouseLeave = function(i, j) {
	var cell = document.getElementById(i + ";" + j);
	cell.classList.remove("hover-strong");
}

var createHTML = function(m, n) {
	var table = "<table>";
	for(var i = 0; i < this.m * this.n; ++i) {
		table += "<tr>";
		for(var j = 0; j < this.m * this.n; ++j) {
			var classes = [];
			if(i % this.m == 0) {
				classes.push("thicktop");
			}
			if(j % this.n == 0) {
				classes.push("thickleft");
			}
			table += "<td id=\"";
			table += i + ";" + j;
			table += "\"";
			if(classes.length > 0) {
				table += " class=\"";
				table += classes.join(" ");
				table += "\"";
			}
			table += " onmouseenter=\"onMouseEnter(" + i + ", " + j + ");\""
			table += " onmouseleave=\"onMouseLeave(" + i + ", " + j + ");\"></td>";
		}
		table += "</tr>";
	}
	table += "</table>";

	div = document.getElementById("sudoku");
	div.innerHTML = table;
}

window.onload = function() {
	m = 3;
	n = 2;
	createHTML(m, n);
	s = new Sudoku(m, n);
	s.grid[1][2] = 3;
	s.show();
}
