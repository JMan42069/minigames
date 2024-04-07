import '../styles/sudoku.css'
import {useState} from 'react';

function SudokuTile(tileId, value, row, col){
    return ( value == null ?
    
        <input type='number' id={tileId} onChange={() => inputHandler(tileId, row, col)} className="sudokutile" maxLength={1}>
    </input>
    :
        <input type='number' id={tileId} readOnly={true} value={value} className="sudokutile" maxLength={1} style={{backgroundColor: '#D3D3D3'}}>
    </input>)
}


/**
 * TODO: implement functions for the following: rowcheck, columncheck, squarecheck
 */
const counter = 0;
let gameBoard= [...Array(9)].map(e => Array(9))
let setupBoard= [...Array(9)].map(e => Array(9).fill(0))
let solutionBoard = Array()
let answerBoard = Array()


// throws undefined error for some reason????
function RowCheck(x, value){
    return (setupBoard[x].includes(value))
}

function ColumnCheck(y, value){
    for (let i = 0; i < setupBoard.length; i++) {
        if (setupBoard[i][y] === value) {
            return true
        }
    }
    return false
}

function SquareCheck(x, y, value) {
    for (let a = Math.floor(x/3) * 3; a < (Math.floor(x/3) * 3) + 3; a++) {
        for (let b = Math.floor(y/3) * 3; b < (Math.floor(y/3) * 3) + 3; b++) {
            if (setupBoard[a][b] === value) {
                return true
            }
        }
    }
    return false
}

function GenerateBoard(){

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            setupBoard[i][j] = 0
            
        }
        
    }
    const numbers = [1,2,3,4,5,6,7,8,9]
    shuffleArray(numbers)

    for (let i = 0; i < numbers.length; i++) {
        let val = numbers[i]
        setupBoard[0][i] = val    
    }

    SolveSudoku()
    answerBoard = JSON.parse(JSON.stringify(setupBoard))

    removeValues(60)
    solutionBoard = JSON.parse(JSON.stringify(setupBoard))
}

function removeValues(dif){
    const tiles = Array()
    for (let i = 0; i < 81; i++) {
        tiles.push(i)
        
    }
    //console.log(tiles)

/**
 * select random index of tiles
 * calculate coords based on tile value using
 * row = Math.floor(val / 9)
 * col = val % 9
 * where val is tiles[index]
 */

    for (let i = 0; i < dif; i++) {
        let indexToRemove = Math.floor(Math.random()*tiles.length)

        let row = Math.floor(tiles[indexToRemove] / 9)
        let col = tiles[indexToRemove] % 9
        //console.log(`row: ${row}, col ${col}`)
        setupBoard[row][col] = 0
        tiles.splice(indexToRemove, 1)
        
    }
}

function SolveSudoku(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (setupBoard[i][j] === 0) {
                for (let z = 1; z < 10; z++) {
                    //console.log(`${z} in row? `,setupBoard[i].includes(z))
                    if (!(setupBoard[i].includes(z) || ColumnCheck(j, z) || SquareCheck(i, j, z))) {
                        // if (!setupBoard[i].includes(z)) {
                        //     setupBoard[i][j] = z
                        //     if (SolveSudoku()) {
                        //         return true
                        //     }
                        //     setupBoard[i][j] = 0
                        // }
                        setupBoard[i][j] = z
                        if (SolveSudoku()) {
                            return true
                        }
                        setupBoard[i][j] = 0
                    }
                }
                return false
            }
        }
    }
    return true
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function inputHandler(id, row, col){
    let tile = document.getElementById(id)
    if (parseInt(tile.value) > 9) {
        tile.value = 9
    }
    else if (parseInt(tile.value) < 1) {
        tile.value = 1
    }
    console.log(`val: ${tile.value} ${row}, ${col}`)
    solutionBoard[row][col] = parseInt(tile.value);
}



function DisplaySudoku(){
    gameBoard= [...Array(9)].map(e => Array(9))
    for (let i = 0; i < 9; i++) {
        for (let y = 0; y < 9; y++) {
            if (setupBoard[i][y] === 0) {
                gameBoard[i][y] = SudokuTile(9*i + y, null, i, y)
                let tile = document.getElementById(9*i + y)
                if (tile !== null) {
                    console.log(tile.value)
                    tile.value = null
                }
                    
            }else {
                gameBoard[i][y] = SudokuTile(9*i + y, setupBoard[i][y])
            }
            
        }
    }
}

function CheckBoard() {
    var numBlank = 0
    var numIncorrect = 0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (isNaN(solutionBoard[i][j]) || solutionBoard[i][j] === 0) {
                numBlank++
            }
            else if (!isNaN(solutionBoard[i][j]) && solutionBoard[i][j] !== answerBoard[i][j]){
                numIncorrect++
            }
        }
    }

    console.log(`there are ${numBlank} spaces left and ${numIncorrect} incorrect spaces`)

    if(numBlank === 0){
        if (numIncorrect === 0) {
            console.log("win")
        }
        else {
            console.log(`there are ${numIncorrect} incorrect numbers`)
        }
    }
}
export function SudokuBoard( val){    
    GenerateBoard()
    console.log(setupBoard)

    DisplaySudoku()

    
    // function test(){
    //     GenerateBoard()
    //     console.log(setupBoard)
    //     DisplaySudoku()
    // }
    return (<div>
        s u d o k u
        <div className='board'>
            {gameBoard}
        </div>
        {/* <button onClick={()=>test()}>New Game</button> */}
        <button onClick={() => CheckBoard()}>Submit</button>
    </div>)
}