/*
For example, consider the following list of jump offsets:

0
3
0
1
-3
Positive jumps ("forward") move downward; negative jumps move upward. For legibility in this example, these offset values will be written all on one line, with the current instruction marked in parentheses. The following steps would be taken before an exit is found:

(0) 3  0  1  -3  - before we have taken any steps.
(1) 3  0  1  -3  - jump with offset 0 (that is, don't jump at all). Fortunately, the instruction is then incremented to 1.
 2 (3) 0  1  -3  - step forward because of the instruction we just modified. The first instruction is incremented again, now to 2.
 2  4  0  1 (-3) - jump all the way to the end; leave a 4 behind.
 2 (4) 0  1  -2  - go back to where we just were; increment -3 to -2.
 2  5  0  1  -2  - jump 4 steps forward, escaping the maze.
*/
var fs = require('fs');

function maze(f) {
  var arr = f.trim().split('\n').map(n => parseInt(n));
  var pos = 0;
  var nextPos = 0;
  var count = 0;
  while(arr[pos] !== undefined) {
    nextPos = pos + arr[pos];
    arr[pos] = arr[pos] + (arr[pos] >= 3 ? -1 : 1);
    pos = nextPos;
    count++;
  }

  return count;
}

var testMaze = `0
3
0
1
-3`;

console.log(maze(testMaze) === 5);

fs.readFile('day5-input.txt', 'utf8', (err,data) => {
  console.log(maze(data));
})
