document.body.style.backgroundColor = "#333";
document.body.style.color = "#fff";

var arr = [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8]
];

// Initialize value
var sum = 0;
var magicSum = 0;
var isMagic = true;

for(r = 0; r < arr.length; r++) {
    magicSum += arr[0][r];
}

// Calculate row count
for(r = 0; r < arr.length; r++) {
    for(c = 0; c < arr[r].length; c++) {
        sum += arr[r][c];
    }
    if(sum !== magicSum) isMagic = false;
    sum = 0;
}

// Calculate column count
for(r = 0; r < arr.length; r++) {
    for(c = 0; c < arr[r].length; c++) {
        sum += arr[c][r];
    }
    if(sum !== magicSum) isMagic = false;
    sum = 0;
}

// Calculate diagonals count
for(i = 0; i < arr.length; i++) {    
    sum += arr[i][i];  
}
if(sum !== magicSum) isMagic = false;
sum = 0;


// Calculate diagonals count
for(i = 0; i < arr.length; i++) {    
    sum += arr[i][arr.length - i - 1];
}
if(sum !== magicSum) isMagic = false;
sum = 0;

document.write(`<div style='
        background:#fff;
        color:#333;
        display:inline-block;
        border-radius:5px;
        padding:5px 15px;
        margin:15px;'>` +
               
        (function() {
            if(isMagic){
                return "This a magic square";
            }

            return "This is not a magic square" }
        )() + `</div>`);