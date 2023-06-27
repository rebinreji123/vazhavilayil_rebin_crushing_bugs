//variables
const theButtons = document.querySelectorAll("#buttonHolder img");
const puzzleBoard = document.querySelector(".puzzle-board");
const puzzlePieces = document.querySelectorAll(".puzzle-pieces img");
const dropZones = document.querySelectorAll(".drop-zone");
const puzzlePiecesDiv = document.querySelector(".puzzle-pieces");
//store the dragged piece in a global variable
//we will need it in the handleDrop function    
let draggedPiece;

function changeBGImage() {
    const backgroundID = this.id;
    puzzleBoard.style.backgroundImage = `url(images/backGround${backgroundID}.jpg)`;
  
    // Reset puzzle by removing dropped pieces from drop zones
    dropZones.forEach((zone) => {
      if (zone.firstChild) {
        const piece = zone.firstChild;
        puzzlePiecesDiv.appendChild(piece);
        piece.classList.remove("dropped");
      }
    });
  
    for (let i = 0; i < puzzlePieces.length; i++) {
      const piece = puzzlePieces[i];
      const originalPieceImage = piece.getAttribute('src');
      const newPieceImage = originalPieceImage.replace(/\d/g, this.id);
      piece.src = newPieceImage;
  }
}

// reset button
document.addEventListener("DOMContentLoaded", function() {
// getting the reset button element
var resetButton = document.getElementById("resetBut");
  
// getting the puzzle pieces container elements
var puzzlePieces = document.querySelector(".puzzle-pieces");
  
// getting the puzzle board elements
var puzzleBoard = document.querySelector(".puzzle-board");
  
// Adding a click event listener to the reset button
resetButton.addEventListener("click", function() {
// Reset the puzzle board by removing all dropped puzzle pieces
var dropZones = puzzleBoard.querySelectorAll(".drop-zone");
dropZones.forEach(function(dropZone) {
// Check if the drop zone has a puzzle piece
if (dropZone.firstChild) {
// Append the puzzle piece back to the puzzle pieces container
puzzlePieces.appendChild(dropZone.firstChild);
}
});
});
});
  
function handleStartDrag() {
    //console.log("Started dragging this piece:", this)
    draggedPiece = this;
}

function handleDragOver(e) {
    e.preventDefault();
    //this will prevent the default dragover behaviour
    //e is short for event, could be e, evt a well
    console.log("dragged over me");
}

function handleDrop(e) {
    e.preventDefault();
    console.log("dropped something on me");
    //this line moves the dragged piece from the left side of the board
    //into whatever dropzone we choose.
    if (this.children.length >=1) {
        return;
    }

    this.appendChild(draggedPiece);
}

//event Listeners
theButtons.forEach(button => button.addEventListener("click", changeBGImage)); 

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));


const resetButton = document.getElementById("resetBut");
resetButton.addEventListener("click", resetPuzzle);