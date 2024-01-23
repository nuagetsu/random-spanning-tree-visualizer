import {randomInt, randomIntExclude} from "./utils.js";
import {Node, Graph} from "./graph.js";
export {drawPoints, draw, redraw};
let G;

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


function draw(canvas, numPoints) {
    Node.resetNodes();
    G = new Graph(canvas, numPoints);
    drawPoints(canvas, G.wilsonsAlgo());
}

function redraw(canvas) { // drawing with same vertices 
    drawPoints(canvas, G.wilsonsAlgo());
}