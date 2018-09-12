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
    let arr = [];
    for(let item of grid){
        arr.push(...item)
    }
    let win = match();
    console.log(win);
    if(win) {
        let player = win === 1 ? 'Computer' : 'You'
        alert(player + ' won!!!');
        location.reload();
        someoneWon = true;
    }
    // console.log(grid);
    // let win = horizontalMatch(arr);
    // if(win < 3) console.log('row ' + win + ' wins')
}

function announce() {}

function match(){
    let winning = 0;
    let matchArr = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]],
    ];

    matchArr.forEach( (cas, i) => {
        let val = grid[cas[0][0]][cas[0][1]];
        let matchCas = cas.every( loc => grid[loc[0]][loc[1]] === val);

        if(matchCas) winning = val;
    });
    return winning;
}

/*this code took too much time so above is done

function horizontalMatch(array){
    // let arr0 = [0,1,2];
    // let arr1 = [3,4,5];
    // let arr2 = [6,7,8];
    let winRowIndex = 3;
    console.log(grid)
    grid.forEach( (row, i) => {
        let countArr = row.reduce( (val, i) => {
            if(!array[i]) return [];
    
            if(i === 0) return [array[i]];
            console.log(array[i])

            if(array[i] === val[0]) return [...val, array[i]];
            else return [];
        }, []);
        console.log(countArr)
        let count = countArr && countArr.length;
        if (count === 3) winRowIndex = i;;
    });
    return winRowIndex;
}

function verticalMatch(array){}

function diagonalMatch(array){}

*/

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
    
    checkEmptyBox(colIdx, rowIdx);
    letComputerPlay();
}

function letComputerPlay() {
    const index = Math.floor(Math.random() * emptyCells.length);
    const value = emptyCells[index];
    
    var rowId = value && value[0];
    var colId = value && value[1];
    
    checkEmptyBox(rowId, colId);
}

function checkEmptyBox(rowId, colId){    
    let newValue = myTurn ? 1 : 2;
    grid[rowId][colId] = newValue;
    renderMainGrid();
    addClickHandlers();
    emptyCells = getEmptyCells();
    
    checkWin();
    if(someoneWon) return;
    toggleTurn();
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
