var fs = require('fs')

function get (arr, start, length) {
  var res = []
  length = length || 1
  for (var i = start; i < start + length; i++) {
    res.push(arr[i % arr.length])
  }
  return res
}

function set (arr, items, start) {
  var res = Array.from(arr)
  for (var i = 0; i < items.length; i++) {
    res[(start + i) % arr.length] = items[i]
  }
  return res
}

function twist (work, lengths) {
  return lengths.reduce(function (acc, l, i) {
    return {
      arr: set(acc.arr, get(acc.arr, acc.start, l).reverse(), acc.start),
      start: acc.start + i + l
    }
  }, {arr: work, start: 0}).arr
}

function firstTask (work, input) {
  var result = twist(work, input.trim().split(',').map(n => parseInt(n)))
  return result[0] * result[1]
}

function chunk (arr, chunksize) {
  var result = Array(Math.ceil(arr.length / chunksize))
  result = result.fill(0).map(n => [])
  for (var i = 0; i < arr.length; i++) {
    result[Math.floor(i / chunksize)][i % chunksize] = arr[i]
  }
  return result
}

function expand (arr, multiples) {
  var result = []
  for (var i = 0; i < multiples; i++) {
    result = result.concat(arr)
  }
  return result
}

function toHex (num) {
  return num.toString(16).padStart(2, '0')
}

function secondTask (work, input) {
  var lengths = expand(input.trim().split('').map(n => n.charCodeAt(0)).concat([17, 31, 73, 47, 23]), 64)
  return chunk(twist(work, lengths), 16)
    .map(ch => ch.reduce((acc, n) => acc ^ n, 0))
    .map(toHex)
    .join('')
}

var work = []
for (var i = 0; i < 256; i++) {
  work.push(i)
}

var testArr = [0, 1, 2, 3, 4]
console.log('Tests')
console.log(get(testArr, 3, 4).join(',') === '3,4,0,1')
console.log(get(testArr, 9, 2).join(',') === '4,0')
console.log(set(testArr, [7, 8, 9], 8).join(',') === '9,1,2,7,8')
console.log(chunk(testArr, 2).map(n => n.join(',')).join(':') === '0,1:2,3:4')
console.log(expand(testArr, 5).join(',') === '0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4')
console.log(toHex(254) === 'fe')
console.log(toHex(9) === '09')

var turns = [3, 4, 1, 5]
console.log(twist(testArr, turns).join(',') === '3,4,2,1,0')
console.log(firstTask(testArr, turns.join(',')) === 12)
console.log(secondTask(work, '') === 'a2582a3a0e66e6e86e3812dcb672a272')
console.log(secondTask(work, 'AoC 2017') === '33efeb34ea91902bb2f59c9920caa6cd')
console.log(secondTask(work, '1,2,3') === '3efbe78a8d82f29979031a4aa0b16a9d')
console.log(secondTask(work, '1,2,4') === '63960835bcdc130f0b66d7ff4f6a5a8e')

fs.readFile('day10-input.txt', 'utf8', function (err, data) {
  if (err) {
    console.log('file read error')
    return
  }

  console.log('First task: ', firstTask(work, data))
  console.log('Second task: ', secondTask(work, data))
})
