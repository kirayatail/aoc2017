function tier(n) {
  return (function nTier(n, t) {
    if (n <= Math.pow((t*2 + 1), 2)) {
      return t;
    } else {
      return nTier(n, t+1);
    }
  })(n, 0);
}

function offset(n) {
  var t = tier(n);
  return Math.abs(((n - 1) % (2*t)) - t);
}

function distance(n) {
  return tier(n) + offset(n);
}

console.log(distance(1) == 0);
console.log(distance(12) == 3);
console.log(distance(23) == 2);
console.log(distance(75) == 6);
console.log(distance(1024) == 31);

console.log(distance(368078));
