import { Container, Grid } from '@material-ui/core';
import React from 'react';


interface Props {
    col: number
    row: number
    elements: number[]
}

interface Style{
    background: string 
            padding: string
        color: string
        fontWeight: any
        width: string
}
export default function Cell(props: Props) {
    const index = (props.col*9 + props.row);
    const val = props.elements[index]

    return (
            <Grid container style={boxStyle}>
                <Grid>
                    {/* <Div style={getStyle(index, props.elements[index])}> {val>0? val: 0} > */}
                    {/* </Item> */}
                    <div style={getStyle(index, props.elements[index])}>
                        {val}
                    </div>
                </Grid>
            </Grid>
    )
}

const subgroups = [["a", 0, 1, 2, 9, 10, 11, 18, 19, 20], ["b", 3, 4, 5, 12, 13, 14, 21, 22, 23], ["c", 6, 7, 8, 15, 16, 17, 24, 25, 26], ["d", 27, 28, 29, 36, 37, 38, 45, 46, 47], ["e", 30, 31, 32, 39, 40, 41, 48, 49, 50], ["f", 33, 34, 35, 42, 43, 44, 51, 52, 53], ["g", 54, 55, 56, 63, 64, 65, 72, 73, 74], ["h", 57, 58, 59, 66, 67, 68, 75, 76, 77], ["i", 60, 61, 62, 69, 70, 71, 78, 79, 80]]

function getStyle(index: number, val: number): Style {
    let box:any = subgroups.filter((li: any) => li.includes(index));
    let box2 = box[0][0];
    const style = {
        background: "steelblue", 
        padding: "10px", 
        color: val > 0? "#ff0000": "#fff",
        fontWeight: "bold", 
        width: "100%"
    }
    if(["a", "c", "e", "g", "i"].includes(box2))
        return style
    else {
        return {
            background: "#222", 
            padding: "10px", 
            color: val > 0? "#ff0000": "#fff",
            fontWeight: "bold",
            width: "100%"
        }
    }
}

const boxStyle = {
    width: "50px", 
    border: "3px solid #333", 
    margin: "auto", 
    padding: "0px" 
}