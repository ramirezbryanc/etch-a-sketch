// Grid size declaration
let gridSize = 16;

// Grind rendering
const container = document.querySelector('.container');
for (let i=0; i<gridSize ** 2; i++) {
    const squares = document.createElement('div');
    squares.classList.add('grid-item');
    squares.classList.add(`box-${i}`);
    container.appendChild(squares);
}
container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr`;
container.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;

// Main drawing function
function hoverEvent(targetBlock) {
    targetBlock.target.style.backgroundColor = "black";
}
const gridBlocks = document.querySelectorAll('.grid-item');
gridBlocks.forEach((square) => {square.addEventListener('mouseover', hoverEvent);});
