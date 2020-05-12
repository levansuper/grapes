import React, {Component, useState, useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser'; 
import { ReactParser } from '../react-parser/react-parser';

class CompChild extends Component {
    constructor(props) {
      super(props);
      this.state = {
        numb : props.number
      }
    }
    render(){
      return <div 
        onClick={() => {
          this.setState({
            numb : this.state.numb + 10
          })
        }}
      style={{
        height : "25px",
        width : "25px",
        backgroundColor: "green"
      }}>{this.state.numb}</div>
    }
    
  }
  
  export class Comp extends Component {
    constructor(props) {
      super(props);
    }
    htmlDecode(input){
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    render(){
      console.log("WE ARE HERE!", this.props, this.props.componentTemplate)
    return <div>{[1,2,3,4,5].map((index) => {
      //return ReactHtmlParser (this.props.componentTemplate || "")
      return <ReactParser key={index} html={this.props.componentTemplate} components={{CompChild}} bindings={{number : index, shmamber : (index*index)}} />
    })} </div>
    }
    
  }