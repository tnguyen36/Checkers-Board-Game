import React from 'react';
import Piece from './Piece';
import './styles.css';



const renderBoard = (props) => {
 var {board, onSelect, selectOptions } = props;
 var results = [];
 for (var row = 0; row < board.length; row++) {
     for (var col = 0; col < board[row].length; col++) {
         results.push(
                <Piece id={'' + row + col} color={board[row][col]} onSelect={onSelect} selectOptions={selectOptions} />    
         );
     }
 }
 return results;
}

const Board = (props) => {
    
    return (
        <div className="board">
            {renderBoard(props)}
        </div>
    )
}

export default Board;