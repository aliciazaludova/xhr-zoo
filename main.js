console.log('hi');

// sets up xhr request. executes.
const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "animals.json");
    myRequest.send();
}
// consoles when error occurs
function executeThisCodeIfXHRFails () {
    console.log("something broke");
}
// parses xhr response. passes it to buildDomString function. // no ES6 here.
function executeThisCodeAfterFileLoaded () { const data = JSON.parse(this.responseText);
    buildDomString(data.animals);
}

// string creator. loops through input array. creates h1 tags w names. adds names to one big string. calls printToDom. passes string to it. prints in div that has ID 'zoo'.
// 'animal' represents one animal. is placeholder
// via callan: yep! fancyArray becomes data.animals, then in your forEach, animal represents a single one of those items in fancyArray (which is really data.animals) 
const buildDomString = (fancyArray) => {
    let domString = "";
    fancyArray.forEach((animal) => {
        domString += `<div class=
        "animal">`;
        domString += `<h1>${animal.name}</h1>`;
        domString += `<h3>${animal.number}</h3>`;
        domString += `<img class="animal-image" src="${animal.imageURL}" alt="">`;
        domString += `<div class="button-container">`;
        domString += `<button>Escaped</button>`;
        domString += `</div>`;
        domString += `</div>`;
    })
    printToDom(domString, "zoo");
}

// takes string and div ID. writes string to ID.
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

startApplication();