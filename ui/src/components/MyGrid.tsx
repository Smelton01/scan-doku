import React, { ReactElement } from 'react';
import Cell from './Cell';

interface Props {
    col: number[]
    row: number[]
    elements: number[]
}

export default function MyGrid(props: Props): any {
    return props.col.map((col: number) => (
        props.row.map((li: number) => 
            <Cell elements={props.elements} col={col} row={li}/>
        )
    ));
}
