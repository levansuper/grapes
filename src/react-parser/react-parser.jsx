import React, {Component, useState, useEffect} from 'react';
import JsxParser from "react-jsx-parser";
import {Comp} from '../comp/comp'

import { Style } from "react-style-tag";


export const ReactParser = ({html, css, components, bindings = {}}) => {
  const style =  css?<Style>{css}</Style> : null;
  
  
  return <div>
    {style}
    <JsxParser
      bindings={bindings}
      components={{  ...(components || {}) }}
      jsx={`
        ${html}
      `}
    />
  </div>
}
