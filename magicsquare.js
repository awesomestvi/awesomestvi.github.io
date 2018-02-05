document.body.style.backgroundColor = "#333";
document.body.style.color = "#fff";

document.write("<br>");
document.write("<br>");
document.write("<br>");

document.write('<input id="matrixSize1" type="text"/>');
document.write('<input id="matrixSize2" type="text"/>');
document.write('<input id="matrixSize3" type="text"/>');
document.write("<br>");
document.write('<input id="matrixSize4" type="text"/>');
document.write('<input id="matrixSize5" type="text"/>');
document.write('<input id="matrixSize6" type="text"/>');
document.write("<br>");
document.write('<input id="matrixSize7" type="text"/>');
document.write('<input id="matrixSize8" type="text"/>');
document.write('<input id="matrixSize9" type="text"/>');
document.write("<br>");
document.write('<button onclick="go()" type="submit">Go</button>');

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
        result = "This a magic square";
    }else{
        result = "This is not a magic square";
    }
    
    document.getElementById("result").innerHTML = result;
    
    magicSum = 0;
    sum = 0;
    isMagic = true;
}


document.write(`<div id='result' style='
    background:#fff;
    color:#333;
    display:inline-block;
    border-radius:5px;
    padding:5px 15px;
    margin:15px;'>Evaluating...</div>`);