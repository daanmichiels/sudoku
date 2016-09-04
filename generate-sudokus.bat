:: Please place the QQWing java version (qqwing-1.3.4.jar) in the working directory
:: before running this script.
:: Also, the version of QQWing may need to be adapted in this scripts.

:: This script generates sudokus of the first 4 levels.
:: The puzzles of level 5 are hand-picked.

java -jar qqwing-1.3.4.jar --generate 50 --difficulty simple --one-line > level1.txt
java -jar qqwing-1.3.4.jar --generate 50 --difficulty easy --one-line > level2.txt
java -jar qqwing-1.3.4.jar --generate 50 --difficulty intermediate --one-line > level3.txt
java -jar qqwing-1.3.4.jar --generate 50 --difficulty expert --one-line > level4.txt
