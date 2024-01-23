import {randomInt, randomIntExclude} from "./utils.js";
export {Node, Graph};

class Node {

    static nodes = [];

    constructor(index, xCoord, yCoord) {
        this.index = index;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.next = null;
        Node.nodes.push(this);
    }

    static randomPoints(canvas, numPoints){
        Node.nodes = [];
        let x_offset = canvas.width / 5;
        let y_offset = canvas.height / 5;
        let x;
        let y;
        let node;
        for (let i = 0; i < numPoints; i++) {
            x = randomInt(x_offset, canvas.width - 1 - x_offset);
            y = randomInt(y_offset, canvas.height - 1 - y_offset);
            node = new Node(i, x, y);
        }
    }
    
    static resetNodes() {
        Node.nodes = [];
    }

    static removeNode(x, y) {
        // TO DO: implement removing 
        let afterRemoved = false;
        Node.nodes.filter((node, index, arr) => {
            if (Math.abs(node.xCoord - x) <= 1.5 && Math.abs(node.yCoord - y) <= 1.5) {
                arr.splice(index, 1);
                afterRemoved = true;
                arr[index].index -= 1;
                return true;
            } else {
                if (afterRemoved) {
                    arr[index].index -= 1;
                }
                return false;
            }
        })
    }

}

class Graph {
    constructor(canvas, num) {
        // upon creating new instance of Graph, randomize num points
        Node.randomPoints(canvas, num);
        this.nodes = Node.nodes;
        this.length = num;
    }

    addNode(node) {
        this.nodes.push(node);
        this.length += 1;
    }

    resetNodes(num) {
        this.nodes = [];
        this.length = 0;
    }

    /*
    Wilson's Algo! Generates a uniform distribution of spanning trees (veeery nicely random) given a graph
    
    Start with one vertex in alreadyTraversed. Choose another one not in alreadyTraversed, node v. Then 
    conduct a loop erased random walk from v to anything in alreadyTraversed. Once we hit something 
    in alreadyTraversed, append the path from v to alreadyTraversed via that node. Repeat until 
    all vertices hit.
    */
    wilsonsAlgo() {
        let r1 = randomInt(0, this.length - 1);
        let alreadyTraversed = [this.nodes[r1].index];
        let nextPath = []; // keep track of nodes traversed in each iter of loopErasedRandomWalk
        let E =[]; // E keeps track of edges used in spanning tree we wish to obtain
        while (alreadyTraversed.length != this.length) {
            r1 = randomIntExclude(0, this.length - 1, alreadyTraversed);
            nextPath = this.loopErasedRandomWalk([], alreadyTraversed, this.nodes[r1], E);
            alreadyTraversed = alreadyTraversed.concat(nextPath);
        }

        return E;
    }

    /*
    A random walk, but everytime we create a cycle by traversing back to a node we have
    traversed to before, we erase the entire loop and continue
    */
    loopErasedRandomWalk(path, alreadyTraversed, start, E) {
        path.push(start.index);
        let currNode = start;
        let nextNode = null;
        let r1 = 0;

        while (true) {
            r1 = randomInt(0, this.length - 1);
            nextNode = this.nodes[r1];

            if (path.includes(nextNode.index)) {
                currNode.next = nextNode;
                this.erasePath(nextNode, path, E);
                currNode = nextNode;
            }

            else if (alreadyTraversed.includes(nextNode.index)) {
                E.push([currNode.index, nextNode.index]);
                return path;
            } 
            
            else {
                currNode.next = nextNode;
                E.push([currNode.index, nextNode.index]);
                path.push(nextNode.index);
                currNode = nextNode;
            }
        }
    }

    // erase any loops
    erasePath(start, path, E) {
        let currNode = start;
        let i;
        while (currNode.next.index != start.index) {
            i = path.indexOf(currNode.next.index);
            path.splice(i, 1);
            i = E.indexOf([currNode.index, currNode.next.index]);
            E.splice(i, 1);
            currNode = currNode.next;
        }
    }

}
