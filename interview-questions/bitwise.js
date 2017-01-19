function isOdd(num) {
    if (num & 1)        
        return true;
    else
        return false;
}

function shift(num, shift = 3) {
    var rotate_bits = num & 0xe0000000;
    num = num << shift;
    rotate_bits = rotate_bits >>> (32 - shift);
    num = num | rotate_bits;
    return num;
}