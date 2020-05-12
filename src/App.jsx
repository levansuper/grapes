import React, {Component, useState, useEffect} from 'react';
import './App.css';
import 'grapesjs/dist/css/grapes.min.css';
import { Comp } from './comp/comp';
import GrapesJS from 'grapesjs';

import gjsPresetWebpage from 'grapesjs-preset-webpage';
import { ReactParser } from './react-parser/react-parser'
import { addParserToEditor } from './parser/parser-html';
import compPlugin from './comp/comp.plugin'

   const temp = localStorage.getItem("asd");
    const SimpleStorage  =JSON.parse(temp || "{}");
console.log(SimpleStorage)
//const SimpleStorage = {};
function App() {
  
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  useEffect(() => {
    if (!editor) {
        const e = GrapesJS.init({
            protectedCss: '',
            container: `#editor`,
            fromElement: true,
            plugins: [gjsPresetWebpage, 'react-component'],
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
          
          load(keys, clb, clbErr) {
              const result = keys.reduce((obj,key) => {
              const value = SimpleStorage[key];
              if (value) {
                obj[key] = value;
              }
              return obj;
            }, {});
          
            if(clb){
              clb(result);
            }
            
          },
          store(data, clb, clbErr) {
            // const castedData = {
            //   "gjs-assets" : JSON.parse(data["gjs-assets"]),
            //   "gjs-components" : JSON.parse(data["gjs-components"]),
            //   "gjs-styles" : JSON.parse(data["gjs-styles"]),
            //   "gjs-css" : data["gjs-css"],
            //   "gjs-html" : data["gjs-html"]
            // }

            // for (let key in castedData) {
            //   SimpleStorage[key] = castedData[key]
            // }
            for (let key in data) {
              SimpleStorage[key] = data[key]
            }
            

            clb();
          }
        });
      
        e.on("update", (a,b,c) => {
          setHtml(e.getHtml());
        });
        e.on("styleManager:change", (a,b,c) => {
          setCss(e.getCss());
        });
        setEditor(e);
        e.load()
        
    }
  });
  if(editor){
  
    const a  = JSON.stringify(SimpleStorage);
    localStorage.setItem("asd", a);
  
  }
  
  return (
    <div className="App">
      <div id="editor"></div>
      {editor?<ReactParser html={html} css={css} components={{Comp}} />:null}
    </div>
  );
}

export default App;