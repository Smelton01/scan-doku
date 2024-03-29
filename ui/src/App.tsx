import React, { useState, useLayoutEffect } from 'react'
import './App.css';
// import { Container, Row, Col } from 'react-flexybox';
import { Button, Container } from '@material-ui/core';
import MyGrid from './components/MyGrid';


export default function App() {
  const [elements, setElements] = useState(Array(81).fill(0))
  const [steps, setSteps] = useState([])
  const [init, setInit] = useState([])
  const [final, setFinal] = useState([])

  const initGrid = (arr: number[][]) => {
    var newList = Array(81).fill(0)
    arr.forEach((step: number[]) => {
      var [index, val] = step
      
      newList[index] = val
      
    })

    setElements(() => newList)
  }
  useLayoutEffect(() => {
    fetch('/api/')
    .then(res => res.json())
    .then(data => {
      setSteps(() => data["steps"])
      setInit(() => data["init"])
      initGrid(data["init"])
      setFinal(() => data["final"])
    })
    .catch(e => console.log(e))
  },[]) 

  const animate = (arr: number[][]) => {
    arr.forEach((step: number[], i: number) => 
    setTimeout(()=>{
      var [index, val] = step
      setElements((e) => [...e.slice(0, index), val, ...e.slice(index+1)])

    }, i*1))
  }

  const quickSolve = (elements: number[]) => {
    setElements(()=>elements)
  }

  return (
      <div className="App">
        <Container style={boxStyle}>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(9, 60px)`}}>
                  <MyGrid elements={elements} row={[0,1,2,3,4,5,6,7,8]} col={[0,1,2,3,4,5,6,7,8]}/>
                </div>
        </Container>
        <Button onClick={()=>initGrid(init)} 
            style={{
            background: "cadetblue",
            color: "white",
            fontWeight: "bold",
            marginTop: "15px",
            marginRight: "15px"
        }}>Init</Button>
        <Button onClick={()=>quickSolve(final)} 
            style={{
            background: "cadetblue",
            color: "white",
            fontWeight: "bold",
            marginTop: "15px",
            marginLeft: "15px"
        }}>Quick Solve</Button>
        <Button onClick={()=>animate(steps)} 
            style={{
            background: "cadetblue",
            color: "white",
            fontWeight: "bold",
            marginTop: "15px",
            marginLeft: "15px"
        }}>Solve it!</Button>
      </div>
  )
}
const boxStyle = {
      width: "550px", 
      alignItems: "center", 
      border: "3px solid #000", 
      margin: "auto", 
      padding: "5px",
      justifyContent: "center"
    }
