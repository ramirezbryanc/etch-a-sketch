// GRID CREATION SECTION
//Get range slider value using JS and store in a variable.
//Pass the value to the JS function that creates the grid.
//The grid will then be created and sized according to the value received from the range slider.

const slider = document.querySelector('#grid-size-selector');
let gridSize = slider.value;
slider.addEventListener('input', getSliderValue);
const gridSizeText = document.querySelector('.grid-size');
gridSizeText.textContent = `Grid Size: ${slider.value} x ${slider.value}`

function getSliderValue() {
    gridSize = slider.value; // Updated this to 'slider.value' instead of this.'value' because other objects will also access this function.
    resizeGrid();
    gridSizeText.textContent = `Grid Size: ${slider.value} x ${slider.value}`
}


const container = document.querySelector('.container-grid-squares');

function createGrid() {
    for (let i=0; i<gridSize ** 2; i++) {
        const squares = document.createElement('div');
        squares.classList.add('grid-item');
        squares.classList.add(`box-${i}`);
        const gridSizeValue = document.querySelector('.slider').value;

        if (i == 0) {
            squares.classList.add('top-left-corner');
        }
        if (i == (gridSizeValue -1)) {
            squares.classList.add('top-right-corner');
        }
        if (i == ((gridSizeValue * gridSizeValue) - 1)) {
            squares.classList.add('bottom-right-corner');
        }
        if (i == ((gridSizeValue *gridSizeValue)- gridSizeValue)) {
            squares.classList.add('bottom-left-corner');
        }

        squares.style.backgroundColor = "rgb(146, 157, 151)";
        container.appendChild(squares);
    }
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;
    let gridBlocks = document.querySelectorAll('.grid-item');
    gridBlocks.forEach(listenHover); 
    gridBlocks.forEach(listenClick);
    gridBlocks.forEach(listenMouseUp);// Add the event listeners to all the squares in the grid.
}

createGrid();

function deleteGrid() {
    while (container.firstChild) {
      container.removeEventListener('mouseover', colorMe);
      container.lastChild = null;
      container.removeChild(container.lastChild);
    }
  }


function resizeGrid() {
    deleteGrid();
    createGrid();
}

// DRAWING SECTION
// Function that checks if my mouse is clicked.
let clickChecker;
function clickFunction(e) {
    console.log(e);
    if (e.type == 'mousedown') {
        return clickChecker = 1;
    } else {
        return clickChecker = 0;
    }
}

// Resets the clickChecker variable when a mouseup occurs inside the grid.
function mouseUpFunction(e) {
    return clickChecker = 0;
}

// Main drawing function
let eraserToggle = 0; 
let rainbowToggle = 0; // Value holders for toggling RGB and Eraser mode.
let shadowToggle = 0;

function colorMe(event) {
    if ( clickChecker == 1 && eraserToggle == 0 && rainbowToggle == 0 && shadowToggle == 0) {
        event.target.style.backgroundColor = "rgb(0,0,0)";
    } else if ( clickChecker == 1 && eraserToggle == 1 ) {
        event.target.style.backgroundColor = "rgb(146, 157, 151)";
    } else if ( clickChecker == 1 && rainbowToggle == 1 && shadowToggle == 0) {
        randomColor();
        event.target.style.backgroundColor = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
    } else if (clickChecker == 1 && rainbowToggle == 0 && shadowToggle == 1) {
        getCurrentColor(event);
        incrementShade();
        event.target.style.backgroundColor = `rgb(${shadeArray[0]}, ${shadeArray[1]}, ${shadeArray[2]})`
    }
}

// Rainbow
let red = 0;
let green = 0;
let blue = 0;
const colorArray = [red, green, blue];

function randomColor () {
    colorArray[0] = Math.floor(Math.random() * 256);
    colorArray[1] = Math.floor(Math.random() * 256);
    colorArray[2] = Math.floor(Math.random() * 256);
}

// Shade
// On hover, get the current bgcolor RGB values, return to an array, then subtract 25 to the individual RGB values.

let sRed = 0;
let sGreen = 0;
let sBlue = 0;
let tRed = 0;
let tGreen = 0;
let tBlue = 0;
const shadeArray = [sRed, sGreen, sBlue];
let newArray = [tRed, tGreen, tBlue];

function getCurrentColor(event) {
    newArray = event.target.style.backgroundColor.split(/[,()]/);
    shadeArray[0] = Number(newArray[1]);
    shadeArray[1] = Number(newArray[2]);
    shadeArray[2] = Number(newArray[3]);
}

function incrementShade() {
    shadeArray[0] += -25;
    shadeArray[1] += -25;
    shadeArray[2] += -25;
}

// The event listener that listens to mousehover.
// For these functions, the parameter refers to the individual square divs
function listenHover(param1) {
    param1.addEventListener('mouseover', colorMe);
}

// The event listener that listens to clicks.
function listenClick(param1) {
    param1.addEventListener('mousedown', clickFunction);
}

// The event listener that listens to mouseup.
function listenMouseUp(param1) {
    param1.addEventListener('mouseup', mouseUpFunction);
}

// BUTTONS FUNCTIONALITY
// D-pad buttons
const dPadUp = document.querySelector('.up');
dPadUp.addEventListener('click', incrementOne);

const dPadDown = document.querySelector('.down');
dPadDown.addEventListener('click', decrementOne);

const dPadRight = document.querySelector('.right');
dPadRight.addEventListener('click', maximize);

const dPadLeft = document.querySelector('.left');
dPadLeft.addEventListener('click', minimize);

function incrementOne () {
    ++slider.value;
    getSliderValue();
}

function decrementOne () {
    --slider.value;
    getSliderValue();
}

function maximize () {
    slider.value = 100;
    getSliderValue();
}

function minimize () {
    slider.value = 16;
    getSliderValue();
}

// Eraser and Clear
const eraserBtn = document.querySelector('.eraser');
eraserBtn.addEventListener('click', eraserOn);

const rgbLed = document.querySelector('#rgb-led');
const shadeLed = document.querySelector('#shade-led');
const eraserLed = document.querySelector('#eraser-led');

function eraserOn () {
    if (eraserToggle == 0) {
        eraserToggle = 1;
        eraserLed.style.backgroundColor = lit;
        eraserLed.style.boxShadow = litShadow;
    } else if (eraserToggle == 1) {
        eraserToggle = 0;
        eraserLed.style.backgroundColor = unlit;
        eraserLed.style.boxShadow = '';
    }
}


const clear = document.querySelector('.clear-grid');
clear.addEventListener('click',resizeGrid);

const rainbowBtn = document.querySelector('.button-a');
rainbowBtn.addEventListener('click', rainbowOn);


function rainbowOn() {
    if (rainbowToggle == 0) {
        rainbowToggle = 1;
        shadowToggle = 0;
        shadeLed.style.backgroundColor = unlit; // Unlight shade led
        shadeLed.style.boxShadow = '';
        rgbLed.style.backgroundColor = lit; // light rgb led
        rgbLed.style.boxShadow = litShadow;
    } else if (rainbowToggle == 1) {
        rainbowToggle = 0;
        rgbLed.style.backgroundColor = unlit; //rgb unlight
        rgbLed.style.boxShadow = '';
    }
}

const shadowBtn = document.querySelector('.button-b');
shadowBtn.addEventListener('click', shadowOn);

function shadowOn() {
    if (shadowToggle == 0) {
        rainbowToggle = 0;
        shadowToggle = 1;
        shadeLed.style.backgroundColor = lit; // light shade led
        shadeLed.style.boxShadow = litShadow;
        rgbLed.style.backgroundColor = unlit; //rgb unlight
        rgbLed.style.boxShadow = '';
    } else if (shadowToggle == 1) {
        shadowToggle = 0;
        shadeLed.style.backgroundColor = unlit; //rgb unlight
        shadeLed.style.boxShadow = '';
    }
}

const unlit = '#929d97';
const lit = '#ca1a21';
const litShadow = '0px 0px 10px #ff552e';