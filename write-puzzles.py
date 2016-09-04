
levels = ["level1", "level2", "level3", "level4", "level5"]

with open("puzzles.js", "w") as f:
	f.write("puzzles = {")

	first = True
	for p in levels:
		if first:
			first = False
		else:
			f.write(", ")
		f.write(p + " : [\n")
		with open(p + ".txt") as pf:
			lines = pf.readlines();
			lines = [line.strip() for line in lines]
			f.write("\"" + "\",\n\"".join(lines) + "\"")
		f.write("]\n")

	f.write("};")

print("Done.")
