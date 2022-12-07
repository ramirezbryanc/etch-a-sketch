// GRID CREATION SECTION
//Get range slider value using JS and store in a variable.
//Pass the value to the JS function that creates the grid.
//The grid will then be created and sized according to the value received from the range slider.

const slider = document.querySelector('#grid-size');
let gridSize = slider.value;
slider.addEventListener('input', getSliderValue);

function getSliderValue() {
    gridSize = slider.value; // Updated this to 'slider.value' instead of this.'value' because other objects will also access this function.
    resizeGrid();
}


const container = document.querySelector('.container');
function createGrid() {
    for (let i=0; i<gridSize ** 2; i++) {
        const squares = document.createElement('div');
        squares.classList.add('grid-item');
        squares.classList.add(`box-${i}`);
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
      container.removeEventListener('mouseover', shadeMe);
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
    console.log('mouseup');
    return clickChecker = 0;
}

// Main drawing function
let eraserToggle = 0; 
let rgbToggler; // Value holders for toggling RGB and Eraser mode.

function shadeMe(event) {
    if ( clickChecker == 1 && eraserToggle == 0) {
   event.target.style.backgroundColor = "black";
    } else if ( clickChecker == 1 && eraserToggle == 1 ) {
        event.target.style.backgroundColor = "white";
    }
}

// The event listener that listens to mousehover.
function listenHover(param1) {
    param1.addEventListener('mouseover', shadeMe);
}

// The event listener that listens to clicks.
function listenClick(param1) {
    param1.addEventListener('mousedown', clickFunction);
}

// The event listener that listens to mouseup.
function listenMouseUp(param1) {
    param1.addEventListener('mouseup', mouseUpFunction);
}

// solution by Kev is addeventlistener onmouseover, execute function. inside function, check if mouse is clicked, if yes, execute function.

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
