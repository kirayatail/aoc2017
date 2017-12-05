var arr = [{x:0, y:0, v: 1}];

var xmin = 0;
var xmax = 0;
var ymin =0;
var ymax = 0;
var dir = 0;

function populate() {
  var last = arr[arr.length-1];
  var next = {
    x: (last.x + ((dir%2 ? 0 : 1)*(dir/2 < 1 ? 1 : -1))),
    y: (last.y + ((dir%2 ? 1 : 0)*(dir/2 < 1 ? 1 : -1))),
    v: last.v + 1,
  };

  next.v = neighborSum(next.x, next.y);

  if (next.x > xmax || next.x < xmin || next.y > ymax || next.y < ymin) {
    dir = (dir + 1) % 4;
    if(next.x > xmax) xmax = next.x;
    if(next.y > ymax) ymax = next.y;
    if(next.x < xmin) xmin = next.x;
    if(next.y < ymin) ymin = next.y;
  }
  arr.push(next);
}

function neighborSum(x,y) {
  return arr.filter(p => {
    return p.x >= (x-1) && p.x <= (x+1) && p.y >= (y-1) && p.y <= (y+1);
  }).map(p => p.v).reduce((acc, n) => acc + n, 0);
}

while(arr[arr.length-1].v <= 368078) populate();
console.log(arr[arr.length-1].v);
