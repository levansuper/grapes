import React, { useState, useEffect, Component} from 'react';
import './App.css';
import 'grapesjs/dist/css/grapes.min.css';
import { SearchResult } from './search-result/search-result';
import GrapesJS from 'grapesjs';

import gjsPresetWebpage from 'grapesjs-preset-webpage';
import { ReactParser } from './react-parser/react-parser'
import { addParserToEditor } from './parser/parser-html';
import { addSearchResultPlugin } from './search-result/search-result.plugin'

  const temp = localStorage.getItem("asd");
  const SimpleStorage = JSON.parse(temp || "{}");
  //const SimpleStorage = {};
interface IAppState {
  editor? : any;
  html?: string;
  css?: string;
}

  class App extends Component<{}, IAppState> {
    constructor (props: any) {
      super(props);
      this.state = { }
    }
  
  componentDidMount() {
    if (!this.state.editor) {
        addSearchResultPlugin();
        const e = GrapesJS.init({
            protectedCss: '',
            container: `#editor`,
            plugins: [gjsPresetWebpage, 'react-component', 'search-result'],
            pluginsOpts: {
              'react-component': {
                customField: 'customValue'
              }
            },
            storageManager: {
              type: 'simple-storage'
            },
        });
        addParserToEditor(e);

        e.StorageManager.add('simple-storage', {
          load(keys: any, cb: any) {
              const result = keys.reduce((obj: any, key: any) => {
              const value = SimpleStorage[key];
              if (value) {
                obj[key] = value;
              }
              return obj;
            }, {});
          
            if(cb){
              cb(result);
            }
            
          },
          store(data: any, cb : any) {
            for (let key in data) {
              SimpleStorage[key] = data[key]
            }

            const a  = JSON.stringify(SimpleStorage);
            localStorage.setItem("asd", a);
            cb(SimpleStorage);
          }
        });
        
        // e.on("component:update", () => {
        //   console.log("component:update HEREEEE")
        //   this.setState({
        //     html: e.getHtml(),
        //     css: e.getCss()
        //   })
        //   e.store()
        // });
        // e.on("styleManager:change", () => {
        //   console.log("styleManager:change HEREEEE")
        //   this.setState({
        //     html: e.getHtml(),
        //     css: e.getCss()
        //   })
        //   e.store()
        // });

        e.load();

        this.setState({
          editor : e
        })
        
        
    }
  };
  render() {
    return (
      <div className="App">
        <div id="editor"></div>
        <input type="button" value="render" onClick={() => {
          
          this.setState({
            html: this.state.editor.getHtml(),
            css: this.state.editor.getCss()
          })
          this.state.editor.store()
        }}/>
        {this.state.editor?<ReactParser html={this.state.html} css={this.state.css} components={{SearchResult}} />:null}
      </div>
    );
  }
  
}

export default App;