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


const container = document.querySelector('.container');
function createGrid() {
    for (let i=0; i<gridSize ** 2; i++) {
        const squares = document.createElement('div');
        squares.classList.add('grid-item');
        squares.classList.add(`box-${i}`);
        squares.style.backgroundColor = "rgb(255,255,255)";
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

function resizeGrid(){
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
    if ( clickChecker == 1 && eraserToggle == 0 && rainbowToggle == 0) {
        event.target.style.backgroundColor = "rgb(0,0,0)";
        /*getCurrentColor(event);
        incrementShade();
        event.target.style.backgroundColor = `rgb(${shadeArray[0]}, ${shadeArray[1]}, ${shadeArray[2]})`*/
    } else if ( clickChecker == 1 && eraserToggle == 1 ) {
        event.target.style.backgroundColor = "white";
    } else if ( clickChecker == 1 && rainbowToggle == 1 ) {
        randomColor();
        event.target.style.backgroundColor = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
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
const shadeArray = [sRed, sGreen, sBlue];

function getCurrentColor(event) {
    console.log(event.target.style.backgroundColor);
    shadeArray[0] = Number(event.target.style.backgroundColor.slice(4,7));
    shadeArray[1] = Number(event.target.style.backgroundColor.slice(9,12));
    shadeArray[2] = Number(event.target.style.backgroundColor.slice(14,17));
    console.log(shadeArray);
}

function incrementShade() {
    shadeArray[0] += -25;
    shadeArray[1] += -25;
    shadeArray[2] += -25;
    console.log(shadeArray);
}

// The event listener that listens to mousehover.
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
dPadUp.addEventListener('mousedown', incrementOne);

const dPadDown = document.querySelector('.down');
dPadDown.addEventListener('mousedown', decrementOne);

const dPadRight = document.querySelector('.right');
dPadRight.addEventListener('mousedown', maximize);

const dPadLeft = document.querySelector('.left');
dPadLeft.addEventListener('mousedown', minimize);

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
eraserBtn.addEventListener('mousedown', eraserOn);

function eraserOn () {
    if (eraserToggle == 0) {
        eraserToggle = 1;
    } else if (eraserToggle == 1) {
        eraserToggle = 0;
    }
}

const clear = document.querySelector('.clear-grid');
clear.addEventListener('mousedown',resizeGrid);

const rainbowBtn = document.querySelector('.button-a');
rainbowBtn.addEventListener('mousedown', rainbowOn);

function rainbowOn() {
    if (rainbowToggle == 0) {
        rainbowToggle = 1;
    } else if (rainbowToggle == 1) {
        rainbowToggle = 0;
    }
}
