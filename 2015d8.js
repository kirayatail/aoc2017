const fs = require('fs');

const strip = (str) => str.replace(/\\x[\da-f]{2}|\\"|\\\\/g, '_').replace(/"/g,'');
const sum = arr => arr.reduce((a,n)=> a+n, 0);

const diff = row => row.length - strip(row).length;

console.log(diff('""') == 2);
console.log(diff('"abc"') == 2);
console.log(diff('"aaa\\"aaa"') == 3);
console.log(diff('"\\x27"') == 5);

fs.readFile('2015d8-input.txt', 'utf8', (err,data) => {
  console.log(sum(data.trim().split('\n').map(diff)));
})
