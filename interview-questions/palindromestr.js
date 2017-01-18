function ispal(str) {
    var counter = [];
    
    for (i = 0; i < 256; i++) {
        counter.push(0); 
    }
    
    for (i = 0; i < str.length; i++) {
        var ind = str.charCodeAt(i);
        counter[ind] = counter[ind] + 1; 
    }
    
    var odds = 0;
    for (i = 0; i < counter.length; i++) {
        if (counter[i] % 2 != 0)
            odds = odds + 1;
    }
    
    return (odds <= 1);
    
}