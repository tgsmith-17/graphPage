// Class Imports
import Graph from './Graph/Graph.ts'

// Page Styling
import './Graph/GraphStyling.css'

// Component Imports
import NodeDisplay from './Graph/NodeDisplay.tsx'
import GraphSettings from './Graph/GraphSettings.tsx'

import { useState, useEffect, useRef } from 'react'
import './App.css'

//? npm run dev to start server, for some reason

// To push to Github:
//  git add .
//  git commit -m "<COMMIT_MSG>"
//  git push origin main

// TODO:

let graph:Graph = new Graph(window.innerWidth*0.85, window.innerHeight*0.85);

//for(let i:number = 0; i < 7; i++) {
//  graph.addNode(i);
//  if(i > 0) {
//    graph.connect(i, i-1);
//  }
//}

//graph.setStart(graph.nodes[3]);
//graph.setEnd(graph.nodes[graph.length-1]);
// console.log(graph.search());

function App() {
  const [mousePos, setMousePos] = useState<Object>({});

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectingMode, setSelectingMode] = useState<boolean>(false);
  const [addingMode, setAddingMode] = useState<boolean>(false);
  const [movingMode, setMovingMode] = useState<boolean>(false);

  return (
    <>
      <div>
        <h1>Application Page</h1>
        <GraphSettings graph={graph}
          movingMode={movingMode}
          addingMode={addingMode}
          selectingMode={selectingMode}

          setMovingMode={setMovingMode}
          setAddingMode={setAddingMode}
          setSelectingMode={setSelectingMode}

          canvasRef={canvasRef}
          mousePos={mousePos}
        />

        <NodeDisplay
          graph={graph}
          mousePos={mousePos}
          canvasRef={canvasRef}
          setMousePos={setMousePos}
          addingMode={addingMode}
          movingMode={movingMode}
          selectingMode={selectingMode}
        />

      </div>
    </>
  )
}

export default App;
