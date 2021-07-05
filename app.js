//Code adapted from Copyright (c) 2020 Ania Kubow
//Differences: html layout, css styling, dynamic width/height, levels, lines, restart game, globals.js

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


document.addEventListener('DOMContentLoaded', () => {
    let nextRandom = 0;
    let timerId;
    let score = 0;
    let lines = 0;
    let level = 1;
    let levelInput = document.getElementById('level').value;
    let speed = 1200;
    const colors = ['red', 'blue', 'orange', 'green', 'purple'];
    //initial starting width and height
    addDiv(width, height);

    //Update grid specs after user change
    let container = document.getElementById("control");
    container.addEventListener('input', updateGrid);

    //get score and start button
    const scoreDisplay = document.querySelector('#score');
    const lineDisplay = document.querySelector('#lines');
    const levelDisplay = document.querySelector('#level');
    const levelInputDisplay = document.querySelector('#levelInput');
    const startButton = document.querySelector('#startButton');
    const instructionsButton = document.querySelector('#instructionsButton');

    grid = document.querySelectorAll('.grid');
    squares = Array.from(document.querySelectorAll('.grid div'));


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

        var elem = document.getElementById('taken');
        while (elem != null) {
            elem.parentNode.removeChild(elem);
            elem = document.getElementById('taken');
        }

        //dynamically create new divs
        let size = width * height;
        for (let i = 0; i < size; i++) {
            let newDiv = document.createElement('div');
            newDiv.id = 'block';
            //append each div to parent grid
            document.getElementById('grid').appendChild(newDiv);
        }

        //add "taken" divs
        for (let i = 0; i < width; i++) {
            let newDiv = document.createElement('div');
            newDiv.id = 'taken';
            newDiv.classList.add('taken');
            document.getElementById('grid').appendChild(newDiv);
        }

        //MAY NEED TO MOVE THIS TO GLOBAL
        //create array of square on the grid
        //grid = document.querySelectorAll('.grid');
        //squares = Array.from(document.querySelectorAll('.grid div'));

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

        //update level
        levelInput = document.getElementById("levelSelect").value;
        document.getElementById("levelInput").innerHTML = levelInput;
        console.log(level, "updateGrid");

    }

    //remove previous divs
    /*var elem = document.getElementById('block');
    while (elem != null) {
        elem.parentNode.removeChild(elem);
        elem = document.getElementById('block');
    }*/

    //dynamically create new divs
    /*let size = width * height;
    for (let i = 0; i < size; i++) {
        let newDiv = document.createElement('div');
        //newDiv.id = 'block'; 
        //append each div to parent grid
        document.getElementById('grid').appendChild(newDiv);

    }*/
    //MAY NEED TO MOVE THIS TO GLOBAL
    //create array of square on the grid
    'use strict';
    var grid = document.querySelectorAll('.grid');
    var squares = Array.from(document.querySelectorAll('.grid div'));

    //need to update block placement when grid changes
    //updateBlocks();

    var currentPosition = Math.floor(width / 2 - 1); //represents where the block starts falling
    let currentRotation = 0;

    //randomly select a tetromino and its rotation
    let random = Math.floor(Math.random() * blocks.length);
    let currentTetromino = blocks[random][currentRotation];
    let holdTetromino = -1;

    //Draw the tetromino
    function draw() {
        //Add class to each of the squares

        parseInt(currentPosition);

        currentTetromino.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
            squares[currentPosition + index].style.backgroundColor = colors[random];
        });
    }

    //undraw the tetronimo
    function undraw() {

        currentTetromino.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = '';
        })
    }

    //assign functions to keyCodes
    function control(e) {
        //prevents moving/holding when game is paused
        if (timerId == null) return;

        switch (e.keyCode) {
            case 37:
                moveLeft();
                break;
            case 38:
                rotate();
                break;
            case 39:
                moveRight();
                break;
            case 40:
                moveDown();
                break;
            case 72:
                changeHold();
                break;
        }
    }

    document.addEventListener('keydown', control);

    function changeHold() {
        //If this is the first tetromino and there is no tetromino in hold
        if (holdTetromino == -1) {
            undraw();
            holdTetromino = random;
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * blocks.length);
            currentTetromino = blocks[random][currentRotation];
            draw();
            displayHold();
            displayShape();
        } else {
            undraw();
            let temp = holdTetromino;
            holdTetromino = random;
            random = temp;
            currentTetromino = blocks[random][currentRotation];
            draw();
            displayHold();
        }
    }

    //display next tetromino in miniGrid
    const displayHoldSquares = document.querySelectorAll('.control div');
    const displayWidth = 4;
    const displayIndex = 0;

    //the tetrominos without rotations
    const holdTetrominos = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //L Tetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z Tetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //T Tetromino
        [0, 1, displayWidth, displayWidth + 1], //O Tetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //I Tetromino
    ]

    //display next shape in miniGrid
    function displayHold() {
        //remove tetromino from entire grid
        displayHoldSquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundColor = '';
        });

        holdTetrominos[holdTetromino].forEach(index => {
            displayHoldSquares[displayIndex + index].classList.add('tetromino');
            displayHoldSquares[displayIndex + index].style.backgroundColor = colors[holdTetromino];
        })
    }

    //move tetromino down
    function moveDown() {
        undraw();

        currentPosition += width;

        draw();
        freeze();
    }

    //stop tetromino from going down if it hits something 
    function freeze() {
        if (currentTetromino.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            currentTetromino.forEach(index => squares[currentPosition + index].classList.add('taken'));
            //start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * blocks.length);
            currentTetromino = blocks[random][currentRotation];
            currentPosition = Math.floor(width / 2 - 1);
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }

    //move tetromino left unless it's at the edge or if theres a block
    function moveLeft() {
        undraw();

        //check if tetronimo is at the left edge
        const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0);

        //if not at left edge, move left by 1
        if (!isAtLeftEdge) currentPosition -= 1;

        //stop tetromino from going left if it is going into spaces that area already occupied
        if (currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }

        draw();
    }

    //move tetromino right unless it's at the edge or if theres a block
    function moveRight() {
        undraw();

        //check if tetronimo is at the right edge
        const isAtRightEdge = currentTetromino.some(index => (currentPosition + index) % width === width - 1);

        //if not at right edge, move right by 1
        if (!isAtRightEdge) currentPosition += 1;

        //stop tetromino from going right if it is going into spaces that area already occupied
        if (currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }

        draw();
    }

    //check if tetromino is at right edge
    function atRight() {
        return currentTetromino.some(index => (currentPosition + index + 1) % width === 0);
    }

    //check if tetromino is at left edge
    function atLeft() {
        return currentTetromino.some(index => (currentPosition + index) % width === 0);
    }

    function checkRotatedPosition(p) {
        p = p || currentPosition;
        if ((p + 1) % width < 4) {
            //if at right edge, add 1 to wrap it back around
            if (atRight()) {
                currentPosition += 1;
                checkRotatedPosition(p); //need to check again
            }
        } else if (p % width > 5) {
            if (atLeft()) {
                currentPosition -= 1;
                checkRotatedPosition(p);
            }
        }
    }

    //rotate tetromino
    function rotate() {
        undraw();
        currentRotation++;
        //if current rotation is 4, go back to original rotation
        if (currentRotation === currentTetromino.length) {
            currentRotation = 0;
        }
        currentTetromino = blocks[random][currentRotation];
        checkRotatedPosition();
        draw();
    }

    //display next tetromino in miniGrid
    const displaySquares = document.querySelectorAll('.miniGrid div');
    //const displayWidth = 4;
    //const displayIndex = 0;

    //the tetrominos without rotations
    const nextTetrominos = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //L Tetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z Tetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //T Tetromino
        [0, 1, displayWidth, displayWidth + 1], //O Tetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //I Tetromino
    ]

    //dispaly next shape in miniGrid
    function displayShape() {
        //remove tetromino from entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundColor = '';
        });

        nextTetrominos[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
        })
    }

    //add functionality to the button
    startButton.addEventListener(('click'), () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, speed);
            //nextRandom = Math.floor(Math.random() * blocks.length);
        }
        displayShape();
    });

    //add score
    function addScore() {
        for (let i = 0; i < (width * height); i += width) {
            //add every square in a row
            const row = [];
            for (let j = 0; j < width; j++) {
                row.push(i + j);
            }

            //check if every square in the row is occupied
            if (row.every(index => squares[index].classList.contains('taken'))) {
                //update score
                score += 10;
                scoreDisplay.innerHTML = score;
                //update lines
                lines += 1;
                lineDisplay.innerHTML = lines;
                //update level
                if (score % 50 === 0) { //CHANGE THRESHOLD
                    level++;
                    levelDisplay.innerHTML = level;
                    levelInput = level;
                    //levelInputDisplay.innerHTML = levelInput + "t";
                    //increase speed at which tetrominos fall
                    speed -= 100;
                    clearInterval(timerId);
                    timerId = setInterval(moveDown, speed);
                }

                //remove classes taken and tetromino to restore
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundColor = '';
                });

                //remove full row
                const squaresRemoved = squares.splice(i, width);
                //replace row (full row is moved to the top of the grid)
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => document.getElementById('grid').appendChild(cell));
            }
        }
    }

    //game over
    function gameOver() {
        if (currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'gameover';
            clearInterval(timerId);
        }
    }

    function toggleStart() {
        let inputs = document.getElementById("gridSpecs");
        if (inputs.style.display === "none") {
            inputs.style.display = "block";
        } else {
            inputs.style.display = "none";
        }
    }

    let inputs = document.getElementById("startButton");
    inputs.addEventListener('click', toggleStart);

    function resetGame() {
        //remove all tetrominos from main grid
        /*for (let i = 0; i < (width * height); i++) {
            squares[i].classList.remove('taken');
            squares[i].classList.remove('tetromino');
            squares[i].style.backgroundColor = '';
        }*/
        //remove all tetrominos from mini grid
        for (let i = 0; i < (displayWidth * displayWidth); i++) {
            displaySquares[i].classList.remove('taken');
            displaySquares[i].classList.remove('tetromino');
            displaySquares[i].style.backgroundColor = '';
        }

        //remove all tetrominos from hold grid
        for (let i = 0; i < (displayWidth * displayWidth); i++) {
            displayHoldSquares[i].classList.remove('taken');
            displayHoldSquares[i].classList.remove('tetromino');
            displayHoldSquares[i].style.backgroundColor = '';
        }

        //reset score
        score = 0;
        scoreDisplay.innerHTML = score;

        //reset lines
        lines = 0;
        lineDisplay.innerHTML = lines;

        //reset level
        level = parseInt(levelInputDisplay.innerHTML);
        console.log(level, "resetslider");
        levelDisplay.innerHTML = level;
        console.log(levelDisplay.innerHTML, "display");

        //clear timer
        speed = 1200 - (100 * level);
        clearInterval(timerId);

        //reset falling tetromino
        currentPosition = Math.floor(width / 2 - 1);
        currentRotation = 0;

        //randomly select a tetromino and its rotation
        random = Math.floor(Math.random() * blocks.length)
        currentTetromino = blocks[random][currentRotation];

        //randomly select next tetromino
        nextRandom = Math.floor(Math.random() * blocks.length);

        //update should the user change the width and height
        addDiv(width, height);
        grid = document.querySelectorAll('.grid');
        squares = Array.from(document.querySelectorAll('.grid div'));

        parseInt(width);

    }

    let reset = document.getElementById("resetButton");
    reset.addEventListener('click', resetGame);

    function toggleInstructions() {
        let inputs = document.getElementById("instructionsText");
        if (inputs.style.display === "none") {
            inputs.style.display = "block";
        } else {
            inputs.style.display = "none";
        }
    }

    let instructionInput = document.getElementById("instructionsButton");
    instructionInput.addEventListener('click', toggleInstructions);

});