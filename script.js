// GRID CREATION SECTION
//Get range slider value using JS and store in a variable.
//Pass the value to the JS function that creates the grid.
//The grid will then be created and sized according to the value received from the range slider.

const slider = document.querySelector('#grid-size');
let gridSize = slider.value;
slider.addEventListener('input', getSliderValue);

function getSliderValue() {
    gridSize = this.value;
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
let testValue;
function clickFunction(e) {
    console.log(e);
    if (e.type == 'mousedown') {
        return testValue = 1;
    } else {
        return testValue = 0;
    }
}

function mouseUpFunction(e) {
    console.log('mouseup');
    return testValue = 0;
}

// Main drawing function
function shadeMe(event) {
    if ( testValue == 1) {
   event.target.style.backgroundColor = "black";
    } else {
        return;
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



