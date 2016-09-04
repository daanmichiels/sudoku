:: Please place the QQWing java version (e.g. qqwing-1.3.4.jar) in the working directory
:: before running this script.

:: This script generates sudokus of the first 4 levels.
:: The puzzles of level 5 are hand-picked.

java -jar qqwing-1.3.4.jar --generate 50 --difficulty simple --one-line --csv > level1.csv
java -jar qqwing-1.3.4.jar --generate 50 --difficulty easy --one-line --csv > level2.csv
java -jar qqwing-1.3.4.jar --generate 50 --difficulty intermediate --one-line --csv > level3.csv
java -jar qqwing-1.3.4.jar --generate 50 --difficulty expert --one-line --csv > level4.csv
