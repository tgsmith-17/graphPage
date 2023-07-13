// Classes to animate nodes is a graph

// TODO:
// Fix 'undefined' issue with return val in getNode
// Make Node.edges[] store Node vals instead of Node.data vals

// Node class for use in Graph class
class Node
{
  constructor(n:number, x:number, y:number)
  {
    this.x = x;
    this.y = y;
    this.data = n;
    this.edges = [];
    this.lineConnected = false; // Used for the animation between edges
    this.visited = false; // Used for BPS for backtracking
    this.selected = false;
  }
  
  addEdge(neighbor:Node):null
  {
    this.edges.push(neighbor);
  }
};

class Graph
{
  constructor(width, height)
  {
    this.width = width;
    this.height = height;

    this.nodes = []; // Used to store array of nodes in graph
    this.graph = {}; // Will help visualize data in graph, also as a hash (sort of)
    this.length = 0;

    this.start = null;
    this.end = null;
  }

  addNode(n:any):void
  {
    let tmp = new Node(n, Math.random()*this.width, Math.random()*this.height);
    this.nodes.push(tmp); // Adds node to graph
    let closeTo:any = tmp.data;
    this.graph[`${this.length}`] = tmp; // Node into "hash"
    this.length++;
  }

  // Making this omni-directional, so traversal is easier
  connect(i:number, j:number):void
  {
    this.nodes[i].addEdge(this.nodes[j]);
    this.nodes[j].addEdge(this.nodes[i]);
  }

  getNode(n:number):Node
  {
    let tmp:Node[] = this.graph[`${n}`];
    return tmp;
  }

  setStart(node:Node):void
  {
    this.start = node;
  }

  setEnd(node:Node):void
  {
    this.end = node;
  }
};

export default Graph;
