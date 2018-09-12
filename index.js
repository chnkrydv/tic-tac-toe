/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

let myTurn = false;
let emptyCells = [];
let someoneWon = false;

function toggleTurn() {
    myTurn = !myTurn;
}

function checkWin() {
    let win = match();
    if(win) {
        let player = win === 1 ? 'Computer' : 'You'
        alert(player + ' won!!!');
        someoneWon = true;
    }
    if(!emptyCells.length && !someoneWon) alert('No one won!!!  Refresh the page to play again.');
}

function match(){
    let winning = 0;
    let matchArr = getMatchArray(grid);

    matchArr.forEach( (cas, i) => {
        let val = grid[cas[0][0]][cas[0][1]];
        let matchCas = cas.every( loc => grid[loc[0]][loc[1]] === val);

        if(matchCas) winning = val;
    });
    return winning;
}

// this getMatchArray function will work with any NxN dimention ticTacToe
function getMatchArray(grid){
    let length = grid.length;


    
    // for horizontal and vertical match cases
    let horArr = [];
    let verArr = [];
    for(let i=0; i<length; i++){
        let horTemp = [];
        let verTemp = [];
        for(let j=0; j<length; j++){
            horTemp.push([i, j]);
            verTemp.push([j, i]);
        }
        horArr.push(horTemp);
        verArr.push(verTemp);
    }
    // for horizontal and vertical match cases


    
    // for diagonal match cases
    let sum = length - 1;
    let diagArr = [];
    let diag1Temp = [];
    let diag2Temp = [];
    for(let i=0; i<length; i++){
        for(let j=0; j<length; j++){
            if(i===j) diag1Temp.push([i,j]);
            if(i+j === sum) diag2Temp.push([i,j]);
        }
    }
    diagArr.push(diag1Temp, diag2Temp);
    // for diagonal match cases



    return [...horArr, ...verArr, ...diagArr];
}

function getEmptyCells() {
    let empty = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(!grid[i][j]) empty.push([i,j]);
        }
    }
    
    return empty;
}

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    
    let successfulTurn = checkEmptyBox(colIdx, rowIdx);
    if(successfulTurn) letComputerPlay();
}

function letComputerPlay() {
    const index = Math.floor(Math.random() * emptyCells.length);
    const value = emptyCells[index];
    
    var rowId = value && value[0];
    var colId = value && value[1];
    
    checkEmptyBox(rowId, colId);
}

function checkEmptyBox(rowId, colId){
    console.log(grid[rowId][colId])
    if(someoneWon || grid[rowId][colId]) return false;

    let newValue = myTurn ? 1 : 2;
    grid[rowId][colId] = newValue;
    renderMainGrid();
    addClickHandlers();
    emptyCells = getEmptyCells();
    
    checkWin();
    toggleTurn();

    return true;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
