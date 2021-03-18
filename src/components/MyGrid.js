import React from 'react';
import SubRow from "./SubRow";

export default function MyGrid(props) {
    return props.col.map((col) => (
        <SubRow elements={props.elements} row={props.row} col={col}/>
    ));
}
