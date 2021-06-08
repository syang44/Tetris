import {
    lBlock,
    width,
    setWidth,
    height,
    setHeight,
    setlBlock,
    setzBlock,
    settBlock,
    setoBlock,
    setiBlock,
    blocks,
    setBlocks
}
from './globals.js';

var grid = document.querySelectorAll('.grid');
var squares = Array.from(document.querySelectorAll('.grid div'));
console.log(squares);

document.addEventListener('DOMContentLoaded', () => {
    //initial starting width and height
    addDiv(width, height);

    //Update width and height after user change
    let container = document.getElementById("gridSpecs");
    container.addEventListener('input', updateGrid);

    //get score and start button
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#startButton');

    //grid = document.querySelectorAll('.grid');
    //squares = Array.from(document.querySelectorAll('.grid div'));
});

//Update block placements when width changes
function updateBlocks() {
    setlBlock(width);
    setzBlock(width);
    setiBlock(width);
    settBlock(width);
    setoBlock(width);
    setiBlock(width);
    setBlocks();
}

//Add divs for grid size dynamically according to user input
function addDiv(width, height) {
    //remove previous divs
    var elem = document.getElementById('block');
    while (elem != null) {
        elem.parentNode.removeChild(elem);
        elem = document.getElementById('block');
    }

    //dynamically create new divs
    let size = width * height;
    for (let i = 0; i < size; i++) {
        let newDiv = document.createElement('div');
        newDiv.id = 'block';
        //append each div to parent grid
        document.getElementById('grid').appendChild(newDiv);

    }
    //MAY NEED TO MOVE THIS TO GLOBAL
    //create array of square on the grid
    grid = document.querySelectorAll('.grid');
    squares = Array.from(document.querySelectorAll('.grid div'));
    console.log(squares);
    //need to update block placement when grid changes
    updateBlocks();
}

//Update current width/height of grid
function updateGrid() {
    //Get new value of width and height
    setWidth(document.getElementById("widthInput").value);
    document.getElementById("width").innerHTML = width;
    setHeight(document.getElementById("heightInput").value);
    document.getElementById("height").innerHTML = height;

    //create divs for each cell
    addDiv(width, height);

    //set size of parent grid
    let parentWidth = width * 20;
    let parentHeight = height * 20;
    document.documentElement.style.setProperty(`--width`, parentWidth + 'px');
    document.documentElement.style.setProperty(`--height`, parentHeight + 'px');

}

//remove previous divs
var elem = document.getElementById('block');
while (elem != null) {
    elem.parentNode.removeChild(elem);
    elem = document.getElementById('block');
}

//dynamically create new divs
let size = width * height;
for (let i = 0; i < size; i++) {
    let newDiv = document.createElement('div');
    newDiv.id = 'block';
    //append each div to parent grid
    document.getElementById('grid').appendChild(newDiv);

}
//MAY NEED TO MOVE THIS TO GLOBAL
//create array of square on the grid
grid = document.querySelectorAll('.grid');
squares = Array.from(document.querySelectorAll('.grid div'));
console.log(squares);
//need to update block placement when grid changes
updateBlocks();

let currentPosition = 4
let current = blocks[0][0];

//Draw first rotation in first block
function draw() {
    //Add class to each of the squares
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetrimino');
    });
}

console.log(squares);

draw();