import React, { Component, useState, useEffect, useLayoutEffect } from 'react'
import './App.css';
import MyGrid from "./components/MyGrid";
import { Container, Row, Col } from 'react-flexybox';
import { Button } from '@material-ui/core';

export default function App() {
  const [elements, setElements] = useState(Array(81).fill(0))
  const [steps, setSteps] = useState([])
  const [init, setInit] = useState([])

  const initGrid = (arr) => {
    var newList = Array(81).fill(0)
    arr.forEach(step => {
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
    })
    .catch(e => console.log(e))
  },[]) 

  const results = {"steps": [], "init": []} 

  const animate = (arr) => {
    arr.forEach((step, i) => 
    setTimeout(()=>{
      var [index, val] = step
      setElements((e) => [...e.slice(0, index), val, ...e.slice(index+1)])

    }, i*1))
  }

  return (
      <div className="App">
        <Container style={boxStyle}>
                <div flex style={{ display: "grid", gridTemplateColumns: `repeat(9, 60px)`}}>
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
        <Button onClick={()=>this.fastSolution(this.step)} 
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
