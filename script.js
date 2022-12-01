// Grid size declaration
const slider = document.querySelector('#grid-size');
let gridSize = slider.value;
slider.addEventListener('input', thisFunction);

function thisFunction() {
    gridSize = this.value;
    resizeGrid();
}


// Grind rendering
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
}

createGrid();
function resizeGrid(){
    deleteGrid();
    createGrid();
}

//delete grid for resizing

function deleteGrid() {
    while (container.firstChild) {
      container.removeEventListener('mouseover', shadeMe);
      container.lastChild = null;
      container.removeChild(container.lastChild);
    }
  }
// Main drawing function

function shadeMe(event) {
   event.target.style.backgroundColor = "black";
}

function listenHover(param1) {
    param1.addEventListener('mouseover', shadeMe);
}

// solution by Kev is addeventlistener onmouseover, execute function. inside function, check if mouse is clicked, if yes, execute function.



//App algorithm
//Create divs using Javascript. 
//Target all JS created divs using querySelectorAll (This returns a node list)
//Using the node list, we add event listeners to each div by using the forEach method.
//The event listener listens for a mouseover function, then it will call the shading function.
//The shading function must check if the mouse button is clicked, if it is, then shade the target cell



