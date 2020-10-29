import React from 'react';
import './styles.css';

type IPiece = {
    color: String
    id: string
    onSelect: any
    selectOptions: Array<String>
    tile: boolean     
}


const Piece = (props: IPiece) => {
    return (
        <div className={`piece ${props.selectOptions.includes(props.id) ? 'selectedBox' : 'box'} ${props.tile ? 'color-tile' : undefined}`}>
            <div 
                id={props.id} 
                className={`${props.color === null ? 'empty' : props.color}`}
                onClick={props.onSelect}>
            {props.color !== null && props.color.includes('King') ? <img style={{filter: 'invert(100%) sepia(1%) saturate(1523%) hue-rotate(219deg) brightness(123%) contrast(100%)'}} width="10" height="10" src="crown.svg" alt="crown"/> : null}

            </div>
        </div>
        
    )
}

export default Piece;