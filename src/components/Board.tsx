import React from 'react';
import Piece from './Piece';
import './styles.css';

type IBoard = {
    board: Array<String>
    onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
    selectOptions: Array<String>
}

const renderBoard = (props: IBoard): Array<any> => {
 var {board, onSelect, selectOptions } = props;
 var results: Array<any> = [];
 var colorTile: boolean = true;
 for (var row = 0; row < board.length; row++) {
     for (var col = 0; col < board[row].length; col++) {
         colorTile = !colorTile;
         results.push(
                <div key={'' + row + col} className="grid-item">
                    <Piece id={'' + row + col} tile={colorTile} color={board[row][col]} onSelect={onSelect} selectOptions={selectOptions} /> 
                </div>
                   
         );
     }
     colorTile = !colorTile
 }
 return results;
}

const Board = (props: IBoard) => {
    
    return (
        <div className="board">
            {renderBoard(props)}
        </div>
        
    )
}

export default Board;