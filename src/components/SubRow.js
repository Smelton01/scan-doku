import React from 'react';
import Cell from "./Cell"

export default function SubRow(props) {
    return props.row.map((li) => (     
        <Cell elements={props.elements} col={props.col} row={li}/>
    ));
}

