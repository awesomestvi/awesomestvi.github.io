document.body.style.backgroundColor = "#333";
document.body.style.color = "#fff";

var doc = {};
var array = [];

var sum = 0;
var magicSum = 0;
var isMagic = true;
var result = "";

function go() {
    
    for(i = 1; i < 10; i++){
        doc["a" +i+ ""] = parseInt(document.getElementById('matrixSize'+i).value);
    }
    
    array = [
        [doc.a1, doc.a2, doc.a3],
        [doc.a4, doc.a5, doc.a6],
        [doc.a7, doc.a8, doc.a9]
    ]

    for(r = 0; r < array.length; r++) {
        magicSum += array[0][r];
    }

    // Calculate row count
    for(r = 0; r < array.length; r++) {
        for(c = 0; c < array[r].length; c++) {
            sum += array[r][c];
        }
        if(sum !== magicSum) isMagic = false;
        sum = 0;
    }

    // Calculate column count
    for(r = 0; r < array.length; r++) {
        for(c = 0; c < array[r].length; c++) {
            sum += array[c][r];
        }
        if(sum !== magicSum) isMagic = false;
        sum = 0;
    }

    // Calculate diagonals count
    for(i = 0; i < array.length; i++) {    
        sum += array[i][i];  
    }
    if(sum !== magicSum) isMagic = false;
    sum = 0;


    // Calculate diagonals count
    for(i = 0; i < array.length; i++) {    
        sum += array[i][array.length - i - 1];
    }
    if(sum !== magicSum) isMagic = false;
    sum = 0;
    
    if(isMagic){
        result = "This is a magic square";
    }else{
        result = "This is not a magic square";
    }
    
    document.getElementById("result").innerHTML = result;
    
    magicSum = 0;
    sum = 0;
    isMagic = true;
}


document.write("<div id='result'>Please enter values...</div>");