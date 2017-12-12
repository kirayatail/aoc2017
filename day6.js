var states = [
  [2,8,8,5,4,2,3,1,5,5,1,2,15,13,5,14]
];

const redistribute = (state) => {
  const offset = (curr, i, val) => {
    const l = state.length;
    return Math.floor(val / l) + (((curr + l - (i+1)) % l) < val ? 1 : 0);
  }

  var index = state.reduce((idx, n, i, a) => n > a[idx] ? i : idx, 0);
  var value = state[index];
  return state.map((n, i) => {
    if (i === index) {
      return offset(i, index, value);
    } else {
      return n + offset(i, index, value);
    }
  });
}

const equals = (a,b) => {
  return a.reduce((acc, n, i) => acc && n === b[i], true);
}

const check = (states, cand) => {
  return !states.reduce((acc, s) => acc || equals(s, cand), false);
}

const find = (states, cand) => {
  for (var i=0; i<states.length; i++) {
    if(equals(states[i], cand)) return i;
  }
}

var next = redistribute(states[0]);
while(check(states, next)) {
  states.push(next);
  next = redistribute(next);
}

console.log(states.length);

console.log(states.length - find(states, redistribute(states[states.length - 1])));
