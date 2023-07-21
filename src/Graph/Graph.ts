// Node class for use in Graph class
class Node
{
  x:number;
  y:number;
  // data:any;
  edges:Node[];
  lineConnected:boolean;
  visited:boolean;
  selected:boolean;
  parent:Node;

  constructor(x:number, y:number)
  {
    this.x = x;
    this.y = y;
    // this.data = n;
    this.edges = [];
    this.lineConnected = false; // Used for the animation between edges
    this.visited = false; // Used in BPS for backtracking
    this.selected = false;
    this.parent;
  }
  
  addEdge(neighbor:Node):void
  {
    this.edges.push(neighbor);
  }
};

function breadthFirstSearch(graph:Graph):(Node[] | null)
{
  let path:Array<Node> = [];
  let queue:Array<Node> = [];
  
  graph.start.visited = true;
  queue.push(graph.start);

  while(queue.length > 0) {
    let currNode:Node = queue.shift();
    console.log(currNode.data);
    if(currNode == graph.end) {
      break;
    }
    let edges = currNode.edges;
    for(let i:number = 0; i < edges.length; i++) {
      let neighbor:Node = edges[i];
      if(!neighbor.visited) {
        neighbor.visited = true;
        neighbor.parent = currNode;
        queue.push(neighbor);
      }
    }
  }

  path.push(graph.end);
  let next:Node = graph.end.parent;

  while(next != null) {
    path.push(next);
    next = next.parent;
  }

  for(let i:number = 0; i < graph.length-1; i++) {
    graph.nodes[i].visited = false;
  }

  return path;
};

class Graph
{
  width:number;
  height:number;
  nodes:Node[];
  graph:Object;
  length:number;
  start:Node | null;
  end:Node | null;
  iterX:number;
  iterY:number;

  constructor(widthIn:number, heightIn:number)
  {
    this.width = widthIn;
    this.height = heightIn;

    this.nodes = []; // Used to store array of nodes in graph
    this.graph = {}; // Will help visualize data in graph, also as a hash (sort of)
    this.length = 0;

    this.start = null;
    this.end = null;
    this.iterX = 0;
    this.iterY = 75;
  };

  addNode(x:number | null, y:number | null):void
  {
    let tmp:Node;

    //if(!x && !y) {
    //  x = this.iterX;
    //  y = this.iterY;
    //}

    tmp = new Node(x, y);

    this.iterX += 75;
    if(this.iterX > this.width) {
      this.iterX = 75;
      if(this.iterY > this.height) {
        this.iterY += 75;
      }
    }
    this.nodes.push(tmp); // Adds node to graph
    this.graph[`${this.length}`] = tmp; // Node into "hash"
    this.length++;
  }

  // Making this omni-directional, so traversal is easier
  connect(i:Node, j:Node):void
  {
    i.addEdge(j);
    j.addEdge(i);
  }

  getNode(n:number):Node
  {
    let tmp:Node = this.graph[`${n}`];
    return tmp;
  }

  removeLast()
  {
    this.nodes.pop();
    delete this.graph[`${this.length-1}`];

    this.length -= 1;
  }

  setStart(node:Node):void
  {
    this.start = node;
  }

  setEnd(node:Node):void
  {
    this.end = node;
  }

  addToDist(startNode:Node, endNode:Node):number
  {
    let pt1:number = Math.pow(endNode.x - startNode.x, 2);
    let pt2:number = Math.pow(endNode.y - startNode.y, 2);
    let final:number = Math.sqrt(pt1 + pt2);

    return final;
  }

  takeFromDist(startNode:Node, endNode:Node):number
  {
    let pt1:number = Math.pow(endNode.x - startNode.x, 2);
    let pt2:number = Math.pow(endNode.y - startNode.y, 2);
    let final:number = Math.sqrt(pt1 + pt2);

    return final;
  }

  search():(Node[] | null)
  {
    return breadthFirstSearch(this);
  }
};

export default Graph;
