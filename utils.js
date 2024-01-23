export {getMousePosition, randomInt, randomIntExclude, scaleCoords};
function getMousePosition(canvas, event) {
    // ratios to get the actual coords, as the canvas was stretched from its actual width/height due to CSS styling 
    let ratioX = canvas.width / (canvas.getBoundingClientRect().right - canvas.getBoundingClientRect().left);
    let ratioY = canvas.height / (canvas.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top);
    let x = (event.clientX - canvas.getBoundingClientRect().left) * ratioX;
    let y = (event.clientY - canvas.getBoundingClientRect().top) * ratioY;
    return {xCoord: x, yCoord: y};
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
