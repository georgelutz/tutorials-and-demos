var matrix = [
    //to: 0  1   2   3   4   5    6
    [   0,  1,   1,   0,   0,   0,    0],
    [   0,  0,   0,   0,   0,   0,    1],
    [   0,  0,   0,   1,   0,   0,    0],
    [   0,  0,   0,   0,   1,   1,    0],
    [   0,  0,   0,   0,   0,   0,    0],
    [   0,  0,   0,   0,   0,   0,    1],
    [   0,  0,   0,   0,   0,   0,    0]
];

var seen = [];

function Traverse(from) {
    
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[from][i] === 1) {
            console.log(from + '->' + i);
            
            var item = {f: from, t: i};
            
            if (_.find(seen, item)) {
                console.log('loop');
                return;
            }
            else {
                seen.push(item);
                Traverse(i);
            }
        }
    }
}

Traverse(0);

