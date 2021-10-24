import React from 'react';
import Cell from './Cell';

export default function MyGrid(props) {
    return props.col.map((col) => (
        props.row.map((li) => 
            <Cell elements={props.elements} col={col} row={li}/>
        )
    ));
}
