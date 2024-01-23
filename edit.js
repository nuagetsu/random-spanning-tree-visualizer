import {getMousePosition, randomInt, randomIntExclude, scaleCoords} from "./utils.js";
import {Node, Graph} from "./graph.js";
import {drawPoints, draw, redraw} from "./draw.js";
export {edit, displayEdit, closeEdit};


function edit(canvas, event, G) {
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

function displayEdit(canvas, container, G) { // container to set the css display for the edit screen
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    Node.resetNodes();
    G.resetNodes();
    container.style.display = "initial";
}

// container to set display for edit screen to None
function closeEdit(canvasFrom, canvasTo, container, G) {
    scaleCoords(Node.nodes, canvasFrom, canvasTo); 
    container.style.display = "none";
    drawPoints(drawBoard, G.wilsonsAlgo());
}