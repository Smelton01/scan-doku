import React, { Component, useState, useEffect } from 'react'
import './App.css';
import MyGrid from "./components/MyGrid";
import { Container, Row, Col } from 'react-flexybox';
import { Button } from '@material-ui/core';

// export default class App extends Component {
//   constructor(props){
//     super(props);
//     this.animateSolution = this.animateSolution.bind(this);
//     this.anime = this.anime.bind(this);
//     this.setState = this.setState.bind(this);
//     this.step = []
//     this.final = []
//   };

  

//   componentDidMount(){
//     // console.log(this.step)
//   };

//   state = {
//     row: [0,1,2,3,4,5,6,7,8],
//     col: [0,1,2,3,4,5,6,7,8],
//     elements: Array(81).fill(0)
//   }

//   boxStyle = {
//     width: "550px", 
//     alignItems: "center", 
//     border: "3px solid #000", 
//     margin: "auto", 
//     padding: "5px",
//     justifyContent: "center"
//   }

 
//   animateSolution(step){
//     const arr = [...this.step][0]
//     arr.forEach(sub => sub.forEach((swtch,i) => this.anime(swtch,i)));
//   }

//   fastSolution(){
//     const arr = [...this.final][0]
//     console.log(this.step[0])
//     this.setState({
//         row: [...this.state.row],
//         col: [...this.state.col],
//         elements: [...arr]
//       })
//     };

//   anime(swtch, i){
//     // console.log(this.state)
//     (async () => {
//       await tim(1) 
//       this.changeState(this.setState, swtch);
//     })()
    
//   }
 
//   changeState(setState, swtch) {
//     // this.state.elements = [...this.state.elements.slice(0,swtch[0]), swtch[1], ...this.state.elements.slice(swtch[0]+1)]
//     setState({
//       row: [...this.state.row],
//       col: [...this.state.col],
//       elements: [...this.state.elements.slice(0,swtch[0]), swtch[1], ...this.state.elements.slice(swtch[0]+1)]
//     })
//   }

//   render() {
//     return (
//     )
//   }
// }

// const tim = ms => new Promise(resolve => setTimeout(resolve, ms));


export default function App() {
  const [elements, setElements] = useState(Array(81).fill(0))
  const initGrid = (arr) => {
    var newList = elements
    arr.forEach(step => {
      var [index, val] = step
      
      newList[index] = val
      
    })
    setElements(newList)
  }
    const results = {"steps": [], "init": []} 
  useEffect(() => {
    fetch('/api/')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      results.steps = data["steps"]; 
      results.init = data["init"]; 
      // this.final.push(data["final"]);
      // this.setState({
      // row: [...this.state.row],
      // col: [...this.state.col],
      // elements: data["init"]})
    })
    .catch(e => console.log(e))
    
    initGrid(results.init)
    console.log(results);

  },[]) 
  

  return (
      <div className="App">
        <Container style={boxStyle}>
                <div flex style={{ display: "grid", gridTemplateColumns: `repeat(9, 60px)`}}>
                  <MyGrid elements={elements} row={[0,1,2,3,4,5,6,7,8]} col={[0,1,2,3,4,5,6,7,8]}/>
                </div>
        </Container>
        <Button onClick={()=>this.animateSolution(this.step)} 
            style={{
            background: "cadetblue",
            color: "white",
            fontWeight: "bold",
            marginTop: "15px",
            marginRight: "15px"
        }}>Solve it!</Button>
        <Button onClick={()=>this.fastSolution(this.step)} 
            style={{
            background: "cadetblue",
            color: "white",
            fontWeight: "bold",
            marginTop: "15px",
            marginLeft: "15px"
        }}>Quick Solve</Button>
        <Button onClick={()=>initGrid(results.init)} 
            style={{
            background: "cadetblue",
            color: "white",
            fontWeight: "bold",
            marginTop: "15px",
            marginLeft: "15px"
        }}>Init</Button>
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
