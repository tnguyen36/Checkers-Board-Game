import React from 'react';
import './styles.css';

const Piece = (props) => {
    return (
        <div
            id={props.id} 
            className={`${props.color == null ? 'white' : props.color} piece ${props.selectOptions.includes(props.id) ? 'selectedBox' : 'box'}`} 
            onClick={props.onSelect}>
        </div>
        
    )
}

export default Piece;