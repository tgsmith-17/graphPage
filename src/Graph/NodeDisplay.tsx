import { useEffect, useRef } from 'react'

let FRAME_ITER:number, prevTimeStamp:number;
let selectedNodes:Array<Node> = new Array();


// Separating function from render function for more easily-read parameters
const draw = (ctx, node:Node):void => {
  ctx.moveTo(node.x, node.y);
  ctx.beginPath();

  // ctx.moveTo(node.x, node.y);
  if(!node.selected) {
    ctx.fillStyle = "#17BBE4";
  } else {
    ctx.fillStyle = "#FF2626";
  }

  for(let ii:number = 0; ii < node.edges.length; ii++) {
    if(node.edges[ii].lineConnected) {
      if(node.edges[ii].parent == node) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "lightgreen";
      } else {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
      }
      ctx.beginPath();
      ctx.lineTo(node.edges[ii].x, node.edges[ii].y);
      ctx.stroke();
      ctx.closePath();
    }
  }
  ctx.arc(node.x, node.y, 30, 0, Math.PI*2);
  ctx.fill();

  ctx.stroke();
  ctx.closePath();
}


function handleNodes(ctx, graph):void
{
  for(let i:number = 0; i < graph.nodes.length; i++) {
    let curr:Node = graph.nodes[i];
    draw(ctx, curr);
    curr.lineConnected = true;
  }
}

function updateFrame(timeStamp)
{
  if(FRAME_ITER === undefined) {
    FRAME_ITER = timeStamp;
  }
  /* const elapsed:number = timeStamp - FRAME_ITER;

  if(prevTimeStamp !== timeStamp) {
    const count:number = Math.min(0.1 * elapsed, 200);
  }
  if(elapsed < 2000) {
    prevTimeStamp = timeStamp;
  }
  window.requestAnimationFrame(FRAME_ITER); */
}

function NodeDisplay({graph, setMousePos, mousePos, canvasRef,
                      addingMode, movingMode, selectingMode})
{
  const timeRef = useRef<number>();

  const handleClick = () => {
  // e.preventDefault();
    if(addingMode) {
      graph.addNode(mousePos.x, mousePos.y);
      console.log(graph.nodes[graph.length-1]);
      //if(graph.length >= 2) {
        //graph.setStart(graph.nodes[0]);
        //graph.connect(graph.length-1, graph.length-2);
        //graph.setEnd(graph.nodes[graph.length-1]);
      //}
    } else if(movingMode) {
      selectedNodes = new Array<Node>();
    } else if(selectingMode) {
      for(let i:number = 0; i < graph.length; i++) {
        if((mousePos.x >= graph.nodes[i].x - 15) && (mousePos.x <= graph.nodes[i].x + 15)) {
          if((mousePos.y >= graph.nodes[i].y - 15) && (mousePos.y <= graph.nodes[i].y + 15)) {
            if(selectingMode) {
              selectedNodes.push(graph.nodes[i]);
            } else if(movingMode) {
              selectedNodes = new Array<Node>();
              selectedNodes.push(graph.nodes[i]);
            }
            else {
              graph.nodes[i].selected = true;
              selectedNodes.push(graph.nodes[i]);
            }
          }
        }
      }
    }

    if(selectedNodes.length === 2 && !selectingMode) {
      graph.connect(selectedNodes[0], selectedNodes[1]);
      for(let i:number = 0; i < selectedNodes.length; i++) {
        selectedNodes[i].selected = false;
      }
      selectedNodes = new Array<Node>();
    }
  };

  /*
    const c = document.getElementsByClassName('can')[0];

    c.width = window.innerWidth;
    c.height = window.innerHeight;
  */

  const useAnimationFrame = callback => {
    const animate = (time:number) => {
      // Grabbing/rendering canvas element

      if(timeRef.current != undefined) {
        const deltaTime:number = time - timeRef.current;
        callback(deltaTime);
      }
      timeRef.current = time;

      const c = document.getElementsByClassName('can')[0];

      // c.width = window.innerWidth;
      // c.height = window.innerHeight;

      let ctx = c.getContext('2d');

      ctx.clearRect(0, 0, c.width, c.height);

      ctx.beginPath();

      handleNodes(ctx, graph);

      ctx.stroke();
      ctx.closePath();
    }
    useEffect(() => { 
      const handleMouseMove = (e: Document) => {
        setMousePos({x: e.clientX, y: e.clientY});
      }
      window.addEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseMove);

      console.log(canvasRef);

      canvasRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(canvasRef.current);
    }, []);
  };
  
  // HERE
  useAnimationFrame(deltaTime:number => {
    updateFrame(prevCount:number => (prevCount + deltaTime * 0.01))
  });

  return (
  <>
    <div className="node">
      <canvas className='can'
              ref={canvasRef}
              onClick={handleClick}
              width={window.innerWidth}
              height={window.innerHeight}
      />
    </div>
  </>
  );
};

export default NodeDisplay;

