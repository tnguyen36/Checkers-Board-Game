import React from 'react';
import './styles.css';

const Piece = (props) => {
    console.log(props.selectOptions);
    return (
        <button id={props.id} className={`${props.color == null ? 'white' : props.color} piece ${props.selectOptions.includes(props.id) ? 'selectedBox' : 'box'}`} onClick={props.onSelect}></button>
        
    )
}

export default Piece;