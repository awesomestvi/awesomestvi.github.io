var arr = [
    [1, 2, 8],
    [5, 9, 6],
    [4, 3, 7]
];

var d1 = 0;
var d2 = 0;

for (i = 0; i < arr.length; i++) {
    d1 += arr[i][2]; 
}

for (i = 0; i < arr.length; i++) {
    d2 += arr[i][arr.length - i - 1]; 
}

console.log(d1);
console.log(d2);
console.log(d1 * d2);