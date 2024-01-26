import {getMousePosition, randomInt, randomIntExclude, scaleCoords} from "./utils.js";
import {Node, Graph} from "./graph.js";
import {drawPoints, draw, redraw} from "./draw.js";
import {edit, displayEdit, closeEdit} from "./edit.js";


const drawBoard = document.querySelector("#drawBoard");
const editBoard = document.querySelector("#edit-canvas");

const nodeRange = document.querySelector("#nodeRange");
const numNodes = document.querySelector("#numNodes");
const resetBtn = document.querySelector("#resetBtn");
const resetSameBtn = document.querySelector("#resetSameBtn");
const editBtn = document.querySelector("#editBtn");
const doneBtn = document.querySelector("#done-button");
const editScreen = document.querySelector("#edit-screen");
const wilsonsAlgoScreen = document.querySelector("#wilsons");
const primsAlgoScreen = document.querySelector("#prims");
const kruskalsAlgoScreen = document.querySelector("#kruskals");
const wilsonsAlgoContainer = document.querySelector("#wilsons-container")
const primsAlgoContainer = document.querySelector("#prims-container")
const kruskalsAlgoContainer = document.querySelector("#kruskals-container")


let numPoints = 20;
let G = new Graph(drawBoard, numPoints);
let currentActive = wilsonsAlgoScreen;
let currentActiveContainer = wilsonsAlgoContainer;


/* TO DO: 
3) If ambitious (for some reason), make it such that they can drag the pts around themselves, 
like an edit mode, and add pts. 
4) Perhaps even animation for wilson's algo. 
5) Add comments to code. 
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

function changeScreen(to, toContainer) {
    currentActive.classList.remove("active");
    currentActiveContainer.classList.remove("active");
    to.classList.add("active");
    toContainer.classList.add("active")
    currentActive = to;
    currentActiveContainer = toContainer;
}


resetBtn.addEventListener("click", () => draw(drawBoard, numPoints));
resetSameBtn.addEventListener("click", () => redraw(drawBoard));
editBtn.addEventListener("click", () => displayEdit(editBoard, editScreen, G));
editBoard.addEventListener("click", (event) => edit(editBoard, event, G));
doneBtn.addEventListener("click", () => closeEdit(editBoard, drawBoard, editScreen, G));
wilsonsAlgoScreen.addEventListener("click", () => changeScreen(wilsonsAlgoScreen, wilsonsAlgoContainer));
primsAlgoScreen.addEventListener("click", () => changeScreen(primsAlgoScreen, primsAlgoContainer));
kruskalsAlgoScreen.addEventListener("click", () => changeScreen(kruskalsAlgoScreen, kruskalsAlgoContainer));



draw(drawBoard, numPoints);
run();