function prettyprint(msg) {
	var n = msg.length;
	msg = msg.replace(/_/g, "%c");
	n = msg.length - n;
	var args = [msg];
	for(var i=0; i<n; ++i) {
		args.push(i%2 ? "" : "font-weight: bold;");
	}
	console.log.apply(console, args);
}

function explain() {
	prettyprint("Hey there!");
	prettyprint("The following Javascripts objects are exposed for your use:");
	prettyprint(" - _sudoku_: an object representing the current sudoku");
	prettyprint(" - _ui_: an object representing the UI");
	prettyprint("Both of these have a _explain()_ function that explains their use.");
}
