var fs = require('fs');

const eliminateGarbage = (txt) => {
  return txt.replace(/!./g, '').replace(/<[^>]*>/g, '').replace(/,/g,'');
}

const garbageCount = (txt) => {
  var matches = txt.replace(/!./g,'').match(/<[^>]*>/g);
  return matches.join('').length - (2* matches.length);
}

const tests = [
  {i: '<{!>}>', o: ''},
  {i: '{{<!>},{<!>},{<!>},{<a>}}', o: '{{}}'},
  {i: '{<a>,<a>,<a>,<a>}', o: '{}'}
];

const count = (input) => {
  return input.trim().split('').reduce((acc, p) => {
    if (p === '{') {
      return {depth: acc.depth+1, sum: acc.sum};
    } else {
      return {depth: acc.depth-1, sum: acc.sum + acc.depth};
    }
  }, {depth: 0, sum: 0}).sum;
}

tests.forEach(t => {
  console.log(eliminateGarbage(t.i) === t.o);
});

fs.readFile('day9-input.txt', 'utf8', (err, data) => {
  console.log(count('{}{}') == 2);
  console.log(count('{{{}}}') == 6);
  console.log(count('{{{}{}}{}}') == 11);
  console.log(count(eliminateGarbage('{{},{}}')) == 5);
  console.log(count(eliminateGarbage('{{{},{},{{}}}}')) == 16)
  console.log(count(eliminateGarbage(data)));
  console.log(garbageCount(data));
});
