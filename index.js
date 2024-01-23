import {getMousePosition, randomInt, randomIntExclude, scaleCoords} from "./utils.js";
import {Node, Graph} from "./graph.js";
import {drawPoints, draw, redraw} from "./draw.js";
import {edit, displayEdit, closeEdit} from "./edit.js";

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


let numPoints = 20;
let G = new Graph(drawBoard, numPoints);

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





//G = new Graph(numPoints);

resetBtn.addEventListener("click", () => draw(drawBoard, numPoints));
resetSameBtn.addEventListener("click", () => redraw(drawBoard));
editBtn.addEventListener("click", () => displayEdit(editBoard, editScreen, G));
editBoard.addEventListener("click", (event) => edit(editBoard, event, G));
doneBtn.addEventListener("click", () => closeEdit(editBoard, drawBoard, editScreen, G));

draw(drawBoard, numPoints);
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