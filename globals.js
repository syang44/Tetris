//File with global variables and mutators

//width & height of grid
var width = 10;
var height = 20;

//Mutators to change width and height
function setWidth(value) {
    width = parseInt(value); //must be integers
}

function setHeight(value) {
    height = parseInt(value); //must be integers
}


//Tetris blocks
//Drawn according to parent grid size
//All blocks are drawn as if they were on the top right corner in their rotation positions
//Blocks are drawn on a smaller 3x3 grid
//Ex. if overall grid is 10x20, the first block will be blocks 1, 11, 21, 2
/* Dots represent the shapes (lBlock)
| . .  | | |  | . |  | | | 
| . |  . . .  | . |  . | |
| . |  | | .  . . |  . . .
*/
//L block
let lBlock = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
]
//Change L block placement
function setlBlock(width) {
    let offset = parseInt(width);
    lBlock = [
        [1, offset + 1, offset * 2 + 1, 2],
        [offset, offset + 1, offset + 2, offset * 2 + 2],
        [1, offset + 1, offset * 2 + 1, offset * 2],
        [offset, offset * 2, offset * 2 + 1, offset * 2 + 2],
    ]
}

//Z Block
let zBlock = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1]
]
//Change Z block placement
function setzBlock(width) {
    let offset = parseInt(width);
    zBlock = [
        [offset + 1, offset + 2, offset * 2, offset * 2 + 1],
        [0, offset, offset + 1, offset * 2 + 1],
        [offset + 1, offset + 2, offset * 2, offset * 2 + 1],
        [0, offset, offset + 1, offset * 2 + 1]
    ]
}

//T block
let tBlock = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
]
//Change T block placement
function settBlock(width) {
    let offset = parseInt(width);
    tBlock = [
        [1, offset, offset + 1, offset + 2],
        [1, offset + 1, offset + 2, offset * 2 + 1],
        [offset, offset + 1, offset + 2, offset * 2 + 1],
        [1, offset, offset + 1, offset * 2 + 1]
    ]
}

//O block
let oBlock = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
]
//Change O block placement
function setoBlock(width) {
    let offset = parseInt(width);
    oBlock = [
        [0, 1, offset, offset + 1],
        [0, 1, offset, offset + 1],
        [0, 1, offset, offset + 1],
        [0, 1, offset, offset + 1]
    ]
}

//I block
let iBlock = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
]
//Change I block placement
function setiBlock(width) {
    let offset = parseInt(width);
    iBlock = [
        [1, offset + 1, offset * 2 + 1, offset * 3 + 1],
        [offset, offset + 1, offset + 2, offset + 3],
        [1, offset + 1, offset * 2 + 1, offset * 3 + 1],
        [offset, offset + 1, offset + 2, offset + 3]
    ]
}

//Array of all block shapes
let blocks = [lBlock, zBlock, tBlock, oBlock, iBlock];
//Mutator for blocks
function setBlocks() {
    blocks = [lBlock, zBlock, tBlock, oBlock, iBlock];
}

export {
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
};