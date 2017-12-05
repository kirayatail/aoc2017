var fs = require('fs');

function phraseCheck(row) {
  var words = row.split(' ');
  for(i=0; i< words.length; i++) {
    for(j=i+1; j < words.length; j++) {
      if(isAnagram(words[i], words[j])) return false;
    }
  }
  return true;
}

function isAnagram(a,b) {
  function sort(s) {
    return s.toLowerCase().split('').sort().join('').trim();
  }
  return sort(a) === sort(b);
}

function fileCheck(f) {
  return f.trim().split('\n').reduce((acc,row) => acc + (phraseCheck(row) ? 1 : 0), 0);
}

console.log(phraseCheck('aa bb cc dd ee'));
console.log(!phraseCheck('aa bb cc dd aa'));
console.log(phraseCheck('aa bb cc dd aaa'));

fs.readFile('day4-input.txt', 'utf8', (err, data) => {
  console.log(fileCheck(data));
});
