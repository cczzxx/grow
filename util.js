function shuffle(arr) {//数组乱序
    let m = arr.length;
    while (m){
        let index = Math.floor(Math.random() * m--);
        let cur = arr[m];
        arr[m] = arr[index];
        arr[index] = cur;
    }
    return arr;
}