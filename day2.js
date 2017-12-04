var fs = require('fs');

var checksum = function(inputStr) {
    return inputStr.split('\n').map((rowStr) => {
        return (function diff(obj) {
            return obj.large - obj.small;
        })(rowStr.split('\t').map((n) => parseInt(n)).reduce((acc, n) => {
            return {
                large: (n > acc.large ? n : acc.large),
                small: (n < acc.small ? n : acc.small)
            };
        }, {large: Number.MIN_SAFE_INTEGER, small: Number.MAX_SAFE_INTEGER}))
    }).reduce((acc, i) => acc + i, 0);
}

var checksum2 = function(inputStr) {
    return inputStr.split('\n').map((rowStr) => {
        var row = rowStr.split('\t').map((n) => parseInt(n));

        for (i = 0; i < row.length; i++){
            for (j = i+1; j < row.length; j++) {
                if (row[i] % row[j] === 0) {
                    return row[i] / row[j];
                }
                if (row[j] % row[i] === 0) {
                    return row[j] / row[i];
                }
            }
        }
    }).reduce((acc,i) => acc + i, 0);
}

console.log(checksum("5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8") == 18);
console.log(checksum2("5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5") == 9);

fs.readFile('day2-input.txt', 'utf8', function(err, data) {
    console.log(checksum(data.trim()));
    console.log(checksum2(data.trim()));
});
