console.log('hi');

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "animals.json");
    myRequest.send();
}

function executeThisCodeIfXHRFails () {
    console.log("something broke");
}

function executeThisCodeAfterFileLoaded () {
    // no ES6
    //parse xhr response and pass to buildDomString function
    const data = JSON.parse(this.responseText);
    buildDomString(data.animals);
}

// string creator
const buildDomString = (fancyArray) => {
    let domString = "";
    fancyArray.forEach((animal) => {
        domString += `<h1>${animal.name}</h1>`;
    })
    printToDom(domString, "zoo");
}


const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

startApplication();