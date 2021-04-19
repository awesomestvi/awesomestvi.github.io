document.body.style.backgroundColor = "#333";
document.body.style.color = "#fff";
document.body.style.fontFamily = "monospace";


var person = {
    firstname: "Vishal",
    lastname: "Chauhan",
    address: {
        flatno: "G1-1804",
        building: "New Era",
        location: {
            city: "Kalyan",
            state: "Maharashta",
            country: "India"
        }        
    }
}

var personJson = JSON.stringify(person);
var personArray = personJson.split(",");
for(i = 0; i < personArray.length; i++) {    
    document.write(personArray[i].replace(/[{}]/g, '').replace(/[""]/g, '').replace(/[:]/g, ' : '));
    document.write("<br/>");
}

function greet(a) {
    return "Hi " + a.firstname;
}

document.write(greet(person));
document.write("<br/>");
document.write(greet({
    firstname: "Kavita",
    lastname: "Chauhan"
}));
console.log(personJson);


var vishal = function() {
    console.log('hi');
}
vishal();