"use strict";

function array_floor(arr, num) {
    var sorted_arr = arr.sort(function(a, b){return a-b});
    console.log(sorted_arr);
    
    var i = 0;
    for(;i < sorted_arr.length; i++) {
        if (num < sorted_arr[i]) {
            if (num === 0)
                return 'na'
            return sorted_arr[i-1];
        }
    }
    
    return sorted_arr[i-1];
}

console.log(array_floor([9,10,11],12));