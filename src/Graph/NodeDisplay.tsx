import { useEffect, useState } from 'react'

function NodeDisplay({graph})
{
  // Separating function from render function for more easily-read parameters
  const draw = (ctx, node) => {
    ctx.beginPath();
    ctx.moveTo(node.x, node.y);


    ctx.fillStyle = "#17BBE4";
    
    for(let j:number = 0; j < node.edges.length; j++) {
      if(!node.edges[j].lineConnected) {
        ctx.lineTo(node.edges[j].x, node.edges[j].y);
        ctx.stroke();
        console.log("Supposed to draw");
      }
    }
    ctx.closePath();
    // ctx.arc(node.x, node.y, 30, 0, Math.PI*2);
    ctx.fill();

    ctx.strokeText(node.data, node.x, node.y);

  };

  // Grabbing/rendering canvas element
  useEffect(() => {
    const c = document.getElementsByClassName('can')[0];

    c.width = window.innerWidth * 0.95;
    c.height = window.innerHeight * 0.95;

    let ctx = c.getContext('2d');
    ctx.strokeStyle = '#FFFFFF';

    ctx.font = "lighter 24pt serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.lineWidth = 2;

    ctx.clearRect(0, 0, c.width, c.height);
    
    ctx.beginPath();

    for(let i:number = 0; i < graph.nodes.length; i++) {
      let curr:Node = graph.nodes[i];
      draw(ctx, curr);
      curr.lineConnected = true;
      ctx.stroke();
      ctx.closePath();
    }
    ctx.stroke();
    ctx.closePath();

  }, [draw]);

  return (
  <>
    <div className="node">
      {/* <h3>{node.edges[0]}</h3> */}
      <canvas className='can' />
      {/* <h1>{node.data}</h1> */}
      {/* <h3>{node.edges[1] && node.edges[1]}</h3> */}
    </div>
  </>
  );
};

export default NodeDisplay;

