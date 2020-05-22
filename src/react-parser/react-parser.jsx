import React from 'react';
import JsxParser from "react-jsx-parser";


import { Style } from "react-style-tag";


export const ReactParser = ({html, css=null, components={}, bindings = {}}) => {
  const style =  css?<style>{css}</style> : null;
  return <div>
    {style}
    <JsxParser
      allowUnknownElements={true}
      bindings={bindings}
      components={{  ...(components || {}) }}
      jsx={`
        ${html}
      `}
    />
  </div>
}
