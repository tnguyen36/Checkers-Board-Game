import React from 'react';
import Piece from './Piece';
import './styles.css';



const renderBoard = (props) => {
 var {board, onSelect, selectOptions } = props;
 var results = [];
 var colorTile = true;
 for (var row = 0; row < board.length; row++) {
     for (var col = 0; col < board[row].length; col++) {
         colorTile = !colorTile;
         results.push(
                <div className="grid-item">
                    <Piece id={'' + row + col} tile={colorTile} color={board[row][col]} onSelect={onSelect} selectOptions={selectOptions} /> 
                </div>
                   
         );
     }
     colorTile = !colorTile
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