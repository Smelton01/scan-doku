import React from 'react';
import { Container, Row, Col } from 'react-flexybox';


export default function Cell(props) {
    const index = (props.col*9 + props.row);
    const val = props.elements[index]
    // const [myState, setMystate] = useState({"init":true})

    // useEffect(() => {
    //     console.log(myState, "-has changed")
    // }, [myState])

    return (
            <Container style={boxStyle}>
                <Row gutter={1}>
                    <Col flex={12} style={getStyle(index, props.elements[index])}> {val>0? val: 0} </Col>
                </Row>
            </Container>
    )
}

const subgroups = [["a", 0, 1, 2, 9, 10, 11, 18, 19, 20], ["b", 3, 4, 5, 12, 13, 14, 21, 22, 23], ["c", 6, 7, 8, 15, 16, 17, 24, 25, 26], ["d", 27, 28, 29, 36, 37, 38, 45, 46, 47], ["e", 30, 31, 32, 39, 40, 41, 48, 49, 50], ["f", 33, 34, 35, 42, 43, 44, 51, 52, 53], ["g", 54, 55, 56, 63, 64, 65, 72, 73, 74], ["h", 57, 58, 59, 66, 67, 68, 75, 76, 77], ["i", 60, 61, 62, 69, 70, 71, 78, 79, 80]]

function getStyle(index, val) {
    let box = subgroups.filter((li) => li.includes(index));
    box = box[0][0];
    const style = {
        background: "steelblue", 
        padding: "10px", 
        color: val > 0? "#ff0000": "#fff",
        fontWeight: "bold" 
    }
    if(["a", "c", "e", "g", "i"].includes(box))
        return style
    else {
        return {
            background: "#222", 
            padding: "10px", 
            color: val > 0? "#ff0000": "#fff",
            fontWeight: "bold"
        }
    }
}

const boxStyle = {
    width: "50px", 
    border: "3px solid #333", 
    margin: "auto", 
    padding: "0px" 
}