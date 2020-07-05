import React from 'react';
import './styles.css';

const Piece = (props) => {
    return (
        <div className={`piece ${props.selectOptions.includes(props.id) ? 'selectedBox' : 'box'} ${props.tile ? 'color-tile' : undefined}`}>
            <div 
                id={props.id} 
                className={`${props.color === null ? 'empty' : props.color}`}
                onClick={props.onSelect}>
            </div>
        </div>
        
    )
}

export default Piece;