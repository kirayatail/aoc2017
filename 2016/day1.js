var fs = require('fs');

var tests = [
    {input: "R2, L3", expect: 5},
    {input: "R2, R2, R2", expect: 2},
    {input: "R5, L5, R5, R3", expect: 12}
];

function equals(a) {
    return function(b) {
        return a.x === b.x && a.y === b.y;
    };
}

function distance(input) {
    var visited = [];
    var result = input.split(', ').reduce((state, command) => {
        var distance = parseInt(command.match(/\d+/)[0]);
        var dir = ((command.match(/[RL]/)[0] === 'R' ? 1 : 3) + state.direction) % 4;

        for (var d = 1; d <= distance; d++) {
            var newPos = {
                x: state.x + (d * (dir == 1 ? 1 : dir == 3 ? -1 : 0)),
                y: state.y + (d * (dir == 0 ? 1 : dir == 2 ? -1 : 0))
            }
            if (visited.filter(equals(newPos)).length > 0) {
                console.log(Math.abs(newPos.x) + Math.abs(newPos.y));
            }
            visited.push(newPos);
        }
        var newState = {
            x: state.x + (distance * (dir == 1 ? 1 : dir == 3 ? -1 : 0)),
            y: state.y + (distance * (dir == 0 ? 1 : dir == 2 ? -1 : 0)),
            direction: dir
        };

        return newState;

    }, {x: 0, y: 0, direction: 0});
    return Math.abs(result.x) + Math.abs(result.y);
}

tests.forEach(t => console.log(distance(t.input) === t.expect));

fs.readFile('day1-input.txt', 'utf8', (err, data) => {
    console.log(distance(data.trim()));
});
