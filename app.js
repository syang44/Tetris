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

//var grid = document.querySelectorAll('.grid');
//var squares = Array.from(document.querySelectorAll('.grid div'));
//console.log(squares);



document.addEventListener('DOMContentLoaded', () => {
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = ['red', 'blue', 'orange', 'green', 'purple'];
    //initial starting width and height
    addDiv(width, height);

    //Update width and height after user change
    let container = document.getElementById("gridSpecs");
    container.addEventListener('input', updateGrid);

    //get score and start button
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#startButton');

    grid = document.querySelectorAll('.grid');
    squares = Array.from(document.querySelectorAll('.grid div'));
    console.log(squares, "eventListener");


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
        console.log(squares, "addDiv");
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
    var grid = document.querySelectorAll('.grid');
    var squares = Array.from(document.querySelectorAll('.grid div'));

    //need to update block placement when grid changes
    updateBlocks();

    let currentPosition = 4; //represents where the block starts falling
    let currentRotation = 0;

    //randomly select a tetromino and its rotation
    let random = Math.floor(Math.random() * blocks.length)
    let currentTetromino = blocks[random][currentRotation];

    //Draw the tetromino
    function draw() {
        //Add class to each of the squares
        currentTetromino.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
            squares[currentPosition + index].style.backgroundColor = colors[random];
        });
        //displayShape();
    }

    //undraw the tetronimo
    function undraw() {
        currentTetromino.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = '';
        })
    }

    //draw();

    //make the tetromino move down every second
    //timerId = setInterval(moveDown, 1000);

    //assign functions to keyCodes
    function control(e) {
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
        }
    }

    document.addEventListener('keydown', control);

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
            currentPosition = 4;
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

    //rotate tetromino
    function rotate() {
        undraw();
        currentRotation++;
        //if current rotation is 4, go back to original rotation
        if (currentRotation === currentTetromino.length) {
            currentRotation = 0;
        }
        currentTetromino = blocks[random][currentRotation];
        draw();
    }

    //display next tetromino in miniGrid
    const displaySquares = document.querySelectorAll('.miniGrid div');
    const displayWidth = 4;
    const displayIndex = 0;

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
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * blocks.length);
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
                score += 10;
                scoreDisplay.innerHTML = score;
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

});