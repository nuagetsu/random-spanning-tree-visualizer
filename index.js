import {getMousePosition, randomInt, randomIntExclude, scaleCoords} from "./utils.js";
import {Node, Graph} from "./graph.js";
import {drawPoints, draw, redraw} from "./draw.js";
import {edit, displayEdit, closeEdit} from "./edit.js";

// Defining constants for html elements
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

function run() {
    setTimeout(()=> {
        getParams();
        run();
    }, 75);
}

function getParams() {
    // updates numPoints from the slider
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
    // update display to show which algo user is currently on
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