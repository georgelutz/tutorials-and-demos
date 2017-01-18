function isPalindrome(num) {
    var array = [];
    
    while (num > 0) {
        rem = num % 10;
        array.push(rem);
        num = _.floor(num / 10);
    }

    for (i = 0; i < array.length / 2; i++) {
        if (_.nth(array, i) != _.nth(array, -i-1))
            return false;
    }
    
    return true;
}

console.log(isPalindrome(989));
