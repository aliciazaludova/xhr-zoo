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
    // call it here. don't add to printToDom because that needs to be generic. It needs to fire at the right time. After those buttons have been created
    addEscapedEventListeners();
}

// string creator. loops through input array. creates h1 tags w names. adds names to one big string. calls printToDom. passes string to it. prints in div that has ID 'zoo'.
// 'animal' represents one animal. is placeholder
// via callan: yep! fancyArray becomes data.animals, then in your forEach, animal represents a single one of those items in fancyArray (which is really data.animals) 
const buildDomString = (fancyArray) => {
    let domString = "";
    fancyArray.forEach((animal) => {
        if(animal.isCarnivore) {
            domString += `<div class=
        "animal carnivore">`;
        } else {
            domString += `<div class=
        "animal vegetable">`;
        }
        domString += `<h1>${animal.name}</h1>`;
        domString += `<h3>${animal.number}</h3>`;
        domString += `<img class="animal-image" src="${animal.imageURL}" alt="">`;
        domString += `<div class="button-container">`;
        domString += `<button class="escape">Escaped</button>`;
        domString += `</div>`;
        domString += `</div>`;
    })
    printToDom(domString, "zoo");
}

const addEscapedEventListeners = () => {
    const escapedButtons = document.getElementsByClassName("escape");
    // it's not really an array, it's a DOM collection so a forEach loop wouldn't convert it correctly. need to use for loop.
    for(let i= 0; i<escapedButtons.length; i++){
        escapedButtons[i].addEventListener("click", animalEscaped);
    }
    // animalEscaped();
};

const animalEscaped = (e) => {  // activates two functions and turns buttons red or green
    const badAnimalButtonContainer = e.target.parentNode;
    showCarnivores();
    showVegetables();
    showFoundButton(badAnimalButtonContainer);  // will have single input--escapee
};

const showFoundButton = (buttonContainer) => {
    buttonContainer.innerHTML = `<button id="found">Found</button>`;
    initializeFoundButton();
};

const initializeFoundButton = () => {
    console.log();
    const foundButton = document.getElementById("found");
    foundButton.addEventListener('click', () => {
        // need to loop through all the cards
        const animals = document.getElementsByClassName('animal');
        for(let m=0; m<animals.length; m++) {
            animals[m].children[3].innerHTML = `<button class="escape">Escaped</button>`;
            animals[m].classList.remove("green");
            animals[m].classList.remove("red");
        }
        addEscapedEventListeners();
    })
}
const showCarnivores = () => {
    const carnivores = document.getElementsByClassName("carnivore");
    for(let j=0; j<carnivores.length; j++) {
        carnivores[j].children[3].innerHTML = '';
        carnivores[j].classList.add('red');
    }
};

const initializeEatmeButtons = () => {
    const eatMeButtons = document.getElementsByClassName("eat-me");
    for(let n = 0; n<eatMeButtons.length; n++) {
        eatMeButtons[n].addEventListener('click', (itsAlreadyBeenEaten) => {
        
        })
    }
}
const itsAlreadyBeenEaten = (e) => {
    const currentNumber = e.target.parentNode.parentNode.children[1].innerHTML;
    const newNumber = currentNumber*1 -1;
    e.target.parentNode.parentNode.children[1].innerHTML = newNumber;
}

const showVegetables = () => {
    const vegetables = document.getElementsByClassName("vegetable");
    for(let j=0; j<vegetables.length; j++) {
        // the below modifies the innerHTML of the button
        vegetables[j].children[3].innerHTML = `<button class="eat-me">EAT ME!!!</button>`;
        vegetables[j].classList.add('green');
    }
};

// takes string and div ID. writes string to ID.
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

// the following is asynchronous so addEscapedEventListeners() must be before it
startApplication();