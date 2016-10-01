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
