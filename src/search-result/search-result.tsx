import React, {Component, useState, useEffect} from 'react';
import { ReactParser } from '../react-parser/react-parser';


interface ISearchResultItemImage {
  image : string
}

class SearchResultItemImage extends Component<ISearchResultItemImage> {
    constructor(props: ISearchResultItemImage) {
      super(props);
    }
    render(){
      return <img />
    }
    
  }




  interface ISearchResult {
    searchResultItemTemplate : string
  }


  
  export class SearchResult extends Component<ISearchResult> {
    htmlDecode(input : any){
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    render(){
      console.log("THISSSS!!!!")
    return <div>{[1,2,3,4].map((index) => {
      const bindings = {
        title : `${index} chemi title`,
        button : `${index} button`,
        image : `https://www.nationalgeographic.com/content/dam/travel/commercial/2019/UK/Georgia-Travel-Guide/Tblisi-most-bohemian-city/tbilisi-city-guide-roofs.adapt.1900.1.jpg`
      }
      
      return <ReactParser key={index} html={this.props.searchResultItemTemplate} components={{SearchResultItemImage}} bindings={bindings} />
    })} </div>
    }
    
  }