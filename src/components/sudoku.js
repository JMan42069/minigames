import '../styles/sudoku.css'
import {useState} from 'react';

function SudokuTile(tileId){
    return (<input type='number' id={tileId} className="sudokutile" maxLength={1}>
    </input>)
}
const counter = 0;
const numbers = [1,2,3,4,5,6,7,8,9]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function ContainsElement(array, element){
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            return true
        }
        
    }
    return false
}

function PopulateBoard(board){
    
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            shuffleArray(numbers)
            if (board[x][y] === 0) {
                for (let i in numbers) {
                    if (!(ContainsElement(board[x], i))) {
                        var vertical = [board[0][y],board[1][y],board[2][y],board[3][y],board[4][y],
                        board[5][y],board[6][y],board[7][y],board[8][y]]
                        if (!ContainsElement((vertical), i)) {
                            var square = [...Array(3)].map(e => Array())
                            if (x < 3) {
                                if (y < 3) {
                                    //square = [board[0,3][0,3]]
                                    square[0].push(board[0][0],board[0][1],board[0][2])
                                    square[1].push(board[1][0],board[1][1],board[1][2])
                                    square[2].push(board[2][0],board[2][1],board[2][2])
                                }
                                else if (y < 6) {
                                    //square = [board[0,3][3,6]]
                                    square[0].push(board[0][3],board[0][4],board[0][5])
                                    square[1].push(board[1][3],board[1][4],board[1][5])
                                    square[2].push(board[2][3],board[2][4],board[2][5])
                                }
                                else {
                                    //square = [board[0,3][6,9]]
                                    square[0].push(board[0][6],board[0][7],board[0][8])
                                    square[1].push(board[1][6],board[1][7],board[1][8])
                                    square[2].push(board[2][6],board[2][7],board[2][8])

                                }
                            }
                            else if (x < 6) {
                                if (y < 3) {
                                    //square = [board[3,6][0,3]]
                                    square[0].push(board[3][0],board[3][1],board[3][2])
                                    square[1].push(board[4][0],board[4][1],board[4][2])
                                    square[2].push(board[5][0],board[5][1],board[5][2])
                                }
                                else if (y < 6) {
                                    //square = [board[3,6][3,6]]
                                    square[0].push(board[3][3],board[3][4],board[3][5])
                                    square[1].push(board[4][3],board[4][4],board[4][5])
                                    square[2].push(board[5][3],board[5][4],board[5][5])
                                }
                                else {
                                    //square = [board[3,6][6,9]]
                                    square[0].push(board[3][6],board[3][7],board[3][8])
                                    square[1].push(board[4][6],board[4][7],board[4][8])
                                    square[2].push(board[5][6],board[5][7],board[5][8])

                                }
                            }
                            else{
                                if (y < 3) {
                                    //square = [board[6,9][0,3]]
                                    square[0].push(board[6][0],board[6][1],board[6][2])
                                    square[1].push(board[7][0],board[7][1],board[7][2])
                                    square[2].push(board[8][0],board[8][1],board[8][2])
                                    
                                }
                                else if (y < 6) {
                                    //square = [board[6,9][3,6]]
                                    square[0].push(board[6][3],board[6][4],board[6][5])
                                    square[1].push(board[7][3],board[7][4],board[7][5])
                                    square[2].push(board[8][3],board[8][4],board[8][5])
                                }
                                else {
                                    //square = [board[6,9][6,9]]
                                    square[0].push(board[6][6],board[6][7],board[6][8])
                                    square[1].push(board[7][6],board[7][7],board[7][8])
                                    square[2].push(board[8][6],board[8][7],board[8][8])

                                }
                            }
                            if (ContainsElement(square[0] + square[1] + square[2], i) === false) {
                                board[x][y] = i
                                if (CheckBoard(board)) {
                                    return true
                                }
                                else if (PopulateBoard(board)) {
                                    return true
                                }
                            }
                        }
                    }
                    
                }
                break
            }
            
            //board[x][y] = 0
        }
        
    }
}

function CheckBoard(board) {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (board[x][y] == 0) {
                return false
            }
        }
        
    }
    return true
}
export function SudokuBoard(){
    const [ name, setName ] = useState(null)
    const gameBoard= [...Array(9)].map(e => Array(9))
    const setupBoard= [...Array(9)].map(e => Array(9).fill(0))

    PopulateBoard(setupBoard)
    console.log(setupBoard)

    for (let i = 0; i < 9; i++) {
        for (let y = 0; y < 9; y++) {
            gameBoard[i][y] = SudokuTile(9*i + y)
            
        }
    }


    function test(){
        setName('jordan')
    }
    return (<div>
        hello {name}
        <div className='board'>
            {gameBoard}
        </div>
        <button onClick={()=>test()}>boop</button>
    </div>)
}