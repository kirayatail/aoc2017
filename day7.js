var fs = require('fs');

var example = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

const findParent = (file) => {
  var list = file.split('\n').map(row => {
    return row.split(' ')[0];
  });

  var children = file.split('\n').filter(r => r.indexOf('->') > -1).map(r => {
    return r.split('->')[1].trim();
  }).join(', ').split(', ');
  return list.filter(n => children.indexOf(n) === -1)[0];
}

const makeTree = (file) => {
  const find = (name) => {
    return file.split('\n').filter(r => r.indexOf(name) === 0)[0];
  }

  const makeObject = (row) => {
    return {
      name: row.split(' ')[0],
      value: parseInt(row.split('(')[1].split(')')),
      children: row.indexOf('->') > -1 ? row.split('-> ')[1].split(', ').map(find).map(makeObject) : []
    };
  }
  return makeObject(find(findParent(file)));
}

const sum  = (list) => list.reduce((a,b) => a + b, 0);

const weight = (node) => {
  return node.value + sum(node.children.map(weight));
}

var tree;

console.log(findParent(example) === 'tknk');

fs.readFile('day7-input.txt', 'utf8', (err,data) => {
  console.log(findParent(data));
  tree = makeTree(data);
});
