const drawBoard = document.querySelector("#drawBoard");
//const drawBoardContainer = document.querySelector("#drawBoard-container");
//const ctx = drawBoard.getContext("2d");
const editBoard = document.querySelector("#edit-canvas");

const nodeRange = document.querySelector("#nodeRange");
const numNodes = document.querySelector("#numNodes");
const resetBtn = document.querySelector("#resetBtn");
const resetSameBtn = document.querySelector("#resetSameBtn");
const editBtn = document.querySelector("#editBtn");
const doneBtn = document.querySelector("#done-button");
const editScreen = document.querySelector("#edit-screen");

let boardWidth = drawBoard.width;
let boardHeight = drawBoard.height;
let numPoints = 20;

// IT WORKSSSSS :D
/* TO DO: 
DONE 1) Implement button so user can input how many pts they want + to generate new, 
DONE 2) Maybe another cat to generate new spanning tree w vertices.
3) If ambitious (for some reason), make it such that they can drag the pts around themselves, 
like an edit mode, and add pts. 
4) Perhaps even animation for wilson's algo. 
5) Add comments to code. 
6) Push to git + remote repo
7) Make it *sparkle* aesthetic *sparkle*
8) Liike maybe add animations so it moves
9) split into diff files 
10) use await/async stuff to learn and know
11) use react to make it instead
12) add another mode w prims/krushkals/weighted graph. (probably not)
13) add packages.json for modules that need installing (not that I used any)

*/
class Node {

    static nodes = [];

    constructor(index, xCoord, yCoord) {
        this.index = index;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.next = null;
        Node.nodes.push(this);
    }

    static randomPoints(numPoints){
        Node.nodes = [];
        let x_offset = boardWidth / 5;
        let y_offset = boardHeight / 5;
        let x;
        let y;
        let node;
        for (let i = 0; i < numPoints; i++) {
            x = randomInt(x_offset, boardWidth - 1 - x_offset);
            y = randomInt(y_offset, boardHeight - 1 - y_offset);
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
    constructor(num) {
        Node.randomPoints(num);
        this.nodes = Node.nodes;
        this.length = num;
    }

    addNode(node) {
        this.nodes.push(node);
        this.length += 1;
    }

    resetNodes(num) {
        /*
        Node.randomPoints(num);
        this.nodes = [];
        this.nodes = Node.nodes;
        this.length = num;
        */
        this.nodes = [];
        this.length = 0;
    }

    wilsonsAlgo() {
        
        let r1 = randomInt(0, this.length - 1);
        let alreadyTraversed = [this.nodes[r1].index];
        let nextPath = [];
        let E =[];
        while (alreadyTraversed.length != this.length) {
            r1 = randomIntExclude(0, this.length - 1, alreadyTraversed);
            nextPath = this.loopErasedRandomWalk([], alreadyTraversed, this.nodes[r1], E);
            alreadyTraversed = alreadyTraversed.concat(nextPath);
        }

        return E;
    }

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


function randomInt(start, end) {
    let x = Math.round(Math.random() * (end - start) + start);
    return x;
}

function randomIntExclude(start, end, exclude) {
    let x = randomInt(start, end);
    if (exclude.includes(x)) {
        return randomIntExclude(start, end, exclude);
    } else {
        return x;
    }
}


function drawPoints(canvas, edges) {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    edges.forEach((edge) => {
        let node1 = Node.nodes[edge[0]];
        let node2 = Node.nodes[edge[1]];
        let x1 = node1.xCoord;
        let y1 = node1.yCoord;
        let x2 = node2.xCoord;
        let y2 = node2.yCoord;
        /*
        ctx.strokeStyle = "#E0BFB8";
        ctx.fillStyle = "#E0BFB8";
        */
        ctx.strokeStyle = "#ABCDEF";
        ctx.fillStyle = "#ABCDEF";
        ctx.beginPath();
        ctx.arc(x1, y1, 3, Math.PI * 2, false);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.moveTo(x2, y2 + 1.5);
        ctx.arc(x2, y2, 3, Math.PI * 2, false);
        
        ctx.stroke();
        ctx.fill();
    })
}


function draw() {
    Node.resetNodes();
    G = new Graph(numPoints);
    drawPoints(drawBoard, G.wilsonsAlgo());
}

function redraw() { // drawing with same vertices 
    drawPoints(drawBoard, G.wilsonsAlgo());
}

function run() {
    setTimeout(()=> {
        getParams();
        //resetBtn.addEventListener("click", () => draw(numPoints));
        run();
    }, 75);
}

function getParams() {
    if (numPoints != numNodes.value) {
        if (numNodes.value == '') {
            numPoints= 1;
            nodeRange.value = 1;
        } else {
            numPoints = numNodes.value;
            nodeRange.value = numPoints;
        }
    } else if (numPoints != nodeRange.value) {
        numPoints = nodeRange.value;
        numNodes.value = numPoints;
    }
}

function edit(canvas, event) {
    let ctx = canvas.getContext("2d");
    let {xCoord, yCoord} = getMousePosition(canvas, event);

    let newNode = new Node(Node.nodes.length, xCoord, yCoord);
    G.addNode(newNode);

    ctx.strokeStyle = "#ABCDEF";
    ctx.fillStyle = "#ABCDEF";
    ctx.beginPath();
    ctx.arc(xCoord, yCoord, 3, Math.PI * 2, false);
    ctx.fill();
}

function getMousePosition(canvas, event) {
    // ratios to get the actual coords, as the canvas was stretched from its actual width/height due to CSS styling 
    let ratioX = canvas.width / (canvas.getBoundingClientRect().right - canvas.getBoundingClientRect().left);
    let ratioY = canvas.height / (canvas.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top);
    let x = (event.clientX - canvas.getBoundingClientRect().left) * ratioX;
    let y = (event.clientY - canvas.getBoundingClientRect().top) * ratioY;
    return {xCoord: x, yCoord: y};
}

function displayEdit() {
    let ctx = editBoard.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, editBoard.width, editBoard.height);
    Node.resetNodes();
    G.resetNodes();
    editScreen.style.display = "initial";
}

function closeEdit() {
    scaleCoords(Node.nodes, editBoard, drawBoard);
    editScreen.style.display = "none";
    drawPoints(drawBoard, G.wilsonsAlgo());
}

function scaleCoords(nodes, oldBoard, newBoard) {
    // scale coords based on position and size of the edit canvas and actual canvas to store correct
    // coords for the graph 
    let oldBoardCoords = oldBoard.getBoundingClientRect();
    let newBoardCoords = newBoard.getBoundingClientRect();
    let xOffset = oldBoardCoords.left - newBoardCoords.left;
    let yOffset = oldBoardCoords.top - newBoardCoords.top;

    let oldRatioX = oldBoard.width / (oldBoardCoords.right - oldBoardCoords.left);
    let oldRatioY = oldBoard.height / (oldBoardCoords.bottom - oldBoardCoords.top);
    let newRatioX = newBoard.width / (newBoardCoords.right - newBoardCoords.left);
    let newRatioY = newBoard.height / (newBoardCoords.bottom - newBoardCoords.top);

    nodes.forEach((node) => {
        // scaling based on the ratio of each board's size (which is not 1 due to css styling stretch)
        node.xCoord = ((node.xCoord * oldRatioX) - xOffset) * newRatioX;
        node.yCoord = ((node.yCoord * oldRatioY) + yOffset) * newRatioY;
    })
}



//G = new Graph(numPoints);

resetBtn.addEventListener("click", draw);
resetSameBtn.addEventListener("click", redraw);
editBtn.addEventListener("click", displayEdit);
editBoard.addEventListener("click", (event) => edit(editBoard, event));
doneBtn.addEventListener("click", closeEdit);

draw();
run();



/*
A.forEach(element => {
    console.log(element);
    /*
    console.log(Node.nodes[element[0]] .xCoord);
    console.log(Node.nodes[element[0]].yCoord);
    console.log(Node.nodes[element[1]].xCoord);
    console.log(Node.nodes[element[1]].yCoord);
});

*/