import { useEffect } from 'react'
import Node from './Graph'

// const [selectingMode, setSelectingMode] = useState<boolean>(false);
// const [addingMode, setAddingMode] = useState<boolean>(false);
// const [movingMode, setMovingMode] = useState<boolean>(false);

function GraphSettings({graph, movingMode, addingMode, selectingMode,
                        setMovingMode, setAddingMode, setSelectingMode,
                        mousePos, canvasRef})
{
  let pathChoosing:boolean = false;
  let path:Array<Node> = new Array();

  const movingHandler = () => {
//    document.getElementsByClassName("addingButton")[0].addEventListener("mousedown", (e) => {
//    switch(e.button)
//    {
//      case 0:
//        if(addingMode) {
//        graph.removeLast();
//        setAddingMode(false);
//      } else {
//        graph.addNode(17);
//      }
//        break;
//      }
//    });
    setAddingMode(false);
    setSelectingMode(false);
    setMovingMode(!movingMode);
//    console.log(movingMode);
  };

  const pathSelector = () => {
    if(pathChoosing) {
      for(let i:number = 0; i < graph.nodes.length; i++) {
        if((mousePos.x >= graph.nodes[i].x - 15) && (mousePos.x <= graph.nodes[i].x + 15)) {
          if((mousePos.y >= graph.nodes[i].y - 15) && (mousePos.y <= graph.nodes[i].y + 15)) {
            graph.nodes[i].selected = true;
            path.push(graph.nodes[i]);
          }
        }
      }
    }
  };

  const selectHandler = () => {
    setSelectingMode(!selectingMode);
    setMovingMode(false);
    setAddingMode(false);
    console.log(selectingMode);
  };

  const handleNodeAdder = () => {
    //if(e.button == 0) {
      graph.addNode(17, mousePos.x, mousePos.y);
      console.log("Node Added");
    //}
    //canvasRef.current.removeEventListener("mousedown", handleNodeAdder);
  };

  const addingHandler = () => {
    setMovingMode(false);
    setAddingMode(!addingMode);
      // document.getElementsByClassName("addingButton")[0].innerHTML = "Cancel";
      // addingButton.innerHTML = "Cancel";

    console.log(addingMode);
  };

  //if(addingMode) {
    //if(new MouseEvent("mousedown")) {
    //  handleNodeAdder();
    //}
  //  let tmp:any = new MouseEvent("button");
  //  if(tmp.button === 1) {
  //    console.log("Mouse Pressed");
  //  }
  //  console.log(tmp);
  //}

  return(
    <div className="settings">
      <div className='space' />
      <button className="addingButton" 
        type="button"
        onClick={addingHandler}>
        Add Node
      </button>

      <div className='space' />

      <button
        className="movingButton"
        type="button"
        onClick={movingHandler}>
        Move Node
      </button>

      <div className="space" />

      <button className="solveButton" onClick={selectHandler}>
        Solve Path
      </button>
    </div>
  );
}

export default GraphSettings;

