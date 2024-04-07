import '../styles/sudoku.css'
import {useState} from 'react';

function SudokuTile(tileId, value){
    return ( value == null ?
    
        <input type='number' id={tileId} className="sudokutile" maxLength={1}>
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
var setupBoard= [...Array(9)].map(e => Array(9).fill(0))


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

    removeValues(60)
}

function removeValues(dif){
    const tiles = Array()
    for (let i = 0; i < 81; i++) {
        tiles.push(i)
        
    }
    console.log(tiles)

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
        console.log(`row: ${row}, col ${col}`)
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

function CheckBoard() {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (setupBoard[x][y] === 0) {
                return false
            }
        }
        
    }
    return true
}
export function SudokuBoard(){
    const [ name, setName ] = useState(null)
    //PopulateBoard()
    GenerateBoard()
    console.log(setupBoard)

    function DisplaySudoku(){
        gameBoard= [...Array(9)].map(e => Array(9))
        for (let i = 0; i < 9; i++) {
            for (let y = 0; y < 9; y++) {
                if (setupBoard[i][y] === 0) {
                    gameBoard[i][y] = SudokuTile(9*i + y)
                }else {
                    gameBoard[i][y] = SudokuTile(9*i + y, setupBoard[i][y])
                }
                
            }
        }
    }

    DisplaySudoku()
    function test(){
        GenerateBoard()
        console.log(setupBoard)
        DisplaySudoku()
    }

    return (<div>
        hello {name}
        <div className='board'>
            {gameBoard}
        </div>
        <button onClick={()=>test()}>boop</button>
    </div>)
}