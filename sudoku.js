
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

Sudoku.prototype.toTable = function() {
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
			table += i+";"+j;
			table += "\"";
			if(classes.length > 0) {
				table += " class=\"";
				table += classes.join(" ");
				table += "\"";
			}
			table += ">";
			if(this.grid[i][j] == -1) {
				table += "&nbsp;";
			} else {
				table += this.grid[i][j];
			}
			table += "</td>";
		}
		table += "</tr>";
	}
	table += "</table>";
	return table;
}

window.onload = function() {
	s = new Sudoku(3,3);
	s.grid[1][2] = 3;
	div = document.getElementById("sudoku");
	div.innerHTML = s.toTable();
}
