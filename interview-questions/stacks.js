function balancedParens(input) {
    var opening = '[{(';
    var closing = ']})';

    var stack = [];
    
    for (i = 0; i < input.length; i++) {
        var c = input[i];
        
        var openIndex = opening.indexOf(c);
        var closeIndex = closing.indexOf(c);
        
        if (openIndex >= 0) {
            stack.push(c);
        }
        else if (closeIndex >= 0) {
            var last = _.last(stack);
            if (last === opening[closeIndex]) {
                stack.pop();
            }
            else {
                console.log('mismatch!');
                return false;
            }
        }
    }
    
    if (stack.length > 0)
        return false;
    return true;
}

balancedParens('{[]}');

var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

for (var i = 0; i< 5;i++) {
    if (i = 0)
        x = function() { var temp = i; return function() { alert(temp); }}
    else
        y = function() { alert(i); }
}

x();
y();
