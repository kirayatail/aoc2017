var fs = require('fs');

var registers = {};
var record = [];

const operation = (op) => {
  if (op === '==') return (a,b) => a === b;
  if (op === '!=') return (a,b) => a !== b;
  if (op === '<') return (a,b) => a < b;
  if (op === '<=') return (a,b) => a <= b;
  if (op === '>') return (a,b) => a > b;
  if (op === '>=') return (a,b) => a >= b;

  return (a,b) => false;
}

const test = (reg, op, val) => {
  if (registers[reg] === undefined) {
    registers[reg] = 0;
  }

  return operation(op)(registers[reg], parseInt(val));
}

const action = (reg, op, valStr) => {
  var val = parseInt(valStr);
  if (registers[reg] === undefined) {
    registers[reg] = 0;
  }

  if (op === 'inc') registers[reg] += val;
  if (op === 'dec') registers[reg] -= val;
}

const parse = (row) => {
  //jhb dec 632 if r <= 2

  p = row.split(' ');
  if (test(p[4], p[5], p[6])) {
    action(p[0], p[1], p[2]);
    record.push(highest(Object.entries(registers).map(e => e[1])));
  }
}

const highest = (list) => {
  return list.reduce((acc, n) => n > acc ? n : acc, Number.MIN_SAFE_INTEGER);
}

fs.readFile('day8-input.txt', 'utf8', (err, data) => {
  data.trim().split('\n').forEach(parse);
  console.log("Task 1: " + highest(Object.entries(registers).map(e => e[1])));
  //record.forEach(n => console.log(n));
  console.log("Task 2: " + highest(record));
})
