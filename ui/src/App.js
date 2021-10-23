import React, { Component, setState, useEffect } from 'react'
import './App.css';
import MyGrid from "./components/MyGrid";
import { Container, Row, Col } from 'react-flexybox';
import { Button } from '@material-ui/core';

export default class App extends Component {
  constructor(props){
    super(props);
    this.animateSolution = this.animateSolution.bind(this);
    this.anime = this.anime.bind(this);
    this.setState = this.setState.bind(this);
    this.step = []
    this.final = []
  };

  

  componentDidMount(){
    // console.log(this.step)
    const results = {"steps": [], "init": []} 
    fetch('/api/')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      results.steps.push(data["steps"]); 
      results.init.push(data["init"]); 
      // this.final.push(data["final"]);
      this.setState({
      row: [...this.state.row],
      col: [...this.state.col],
      elements: data["init"]})
    })
    .catch(e => console.log(e))
    
    this.step = results.steps
    
    
    console.log(results);
  };

  state = {
    row: [0,1,2,3,4,5,6,7,8],
    col: [0,1,2,3,4,5,6,7,8],
    elements: Array(81).fill(0)
  }

  boxStyle = {
    width: "550px", 
    alignItems: "center", 
    border: "3px solid #000", 
    margin: "auto", 
    padding: "5px",
    justifyContent: "center"
  }

  animateSolution(step){
    const arr = [...this.step][0]
    arr.forEach(sub => sub.forEach((swtch,i) => this.anime(swtch,i)));
  }

  fastSolution(){
    const arr = [...this.final][0]
    console.log(this.step[0])
    this.setState({
        row: [...this.state.row],
        col: [...this.state.col],
        elements: [...arr]
      })
    };

  anime(swtch, i){
    // console.log(this.state)
    (async () => {
      await tim(1) 
      this.changeState(this.setState, swtch);
    })()
    
  }
 
  changeState(setState, swtch) {
    // this.state.elements = [...this.state.elements.slice(0,swtch[0]), swtch[1], ...this.state.elements.slice(swtch[0]+1)]
    setState({
      row: [...this.state.row],
      col: [...this.state.col],
      elements: [...this.state.elements.slice(0,swtch[0]), swtch[1], ...this.state.elements.slice(swtch[0]+1)]
    })
  }

  render() {
    return (
      <div className="App">
        <Container style={this.boxStyle}>
                <Row flex style={{alignItems: "right"}}>
                  <MyGrid elements={this.state.elements} row={this.state.row} col={this.state.col}/>
                </Row>
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
      </div>
    )
  }
}

const tim = ms => new Promise(resolve => setTimeout(resolve, ms));

