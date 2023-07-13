// Class Imports
import Graph from './Graph/Graph.ts'

// Page Styling
import './Graph/GraphStyling.css'

// Component Imports
import NodeDisplay from './Graph/NodeDisplay.tsx'

import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//? npm run dev to start server, for some reason

// TODO:
// Look into Graph class and finish and
// begin prototyping drawing onto canvas

let graph:Graph = new Graph(window.innerWidth*0.85, window.innerHeight*0.85);

for(let i:number = 0; i < 7; i++) {
  graph.addNode(i);
  if(i > 0) {
    graph.connect(i, i-1);
  }
}

function App() {
  // useEffect will handle rendering canvas to screen
  /* useEffect(() => {
    const c = document.getElementsByClassName("myCan");
    // console.log(c);
    const ctx = c[0].getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(100, 200);
    ctx.stroke();
  }, []); */

  // console.log(graph);
  // console.log(typeof graph.getNode(7).edges[0]);

  return (
    <>
      <div>
        <h1>Application Page</h1>

        <NodeDisplay graph={graph} />

      </div>
    </>
  )
}

export default App;
