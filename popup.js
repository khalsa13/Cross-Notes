"use strict";
const canvas = document.querySelector(".sheet");
const input = document.getElementById("collection");
const description = document.getElementById("description");
const context = canvas.getContext("2d");
const canvasState = document.createElement("canvas");

context.strokeStyle = "#9c1fde";
context.lineJoin = "round";
context.lineWidth = 2;

var clickX = [];
var clickY = [];
var clickDrag = [];
var paint;

/**
 * Add information where the user clicked at.
 * @param {number} x
 * @param {number} y
 * @return {boolean} dragging
 */
function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

/**
 * Redraw the complete canvas.
 */
function redraw() {
  // Clears the canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  for (var i = 0; i < clickX.length; i += 1) {
    if (!clickDrag[i] && i == 0) {
      context.beginPath();
      context.moveTo(clickX[i], clickY[i]);
      context.stroke();
    } else if (!clickDrag[i] && i > 0) {
      context.closePath();

      context.beginPath();
      context.moveTo(clickX[i], clickY[i]);
      context.stroke();
    } else {
      context.lineTo(clickX[i], clickY[i]);
      context.stroke();
    }
  }
}

/**
 * Draw the newly added point.
 * @return {void}
 */
function drawNew() {
  saveCanvasState();
  var i = clickX.length - 1;
  if (!clickDrag[i]) {
    if (clickX.length == 0) {
      context.beginPath();
      context.moveTo(clickX[i], clickY[i]);
      context.stroke();
    } else {
      context.closePath();

      context.beginPath();
      context.moveTo(clickX[i], clickY[i]);
      context.stroke();
    }
  } else {
    context.lineTo(clickX[i], clickY[i]);
    context.stroke();
  }
}

function touchstartEventHandler(e) {
  paint = true;
  if (paint) {
    addClick(
      e.touches[0].pageX - canvas.offsetLeft,
      e.touches[0].pageY - canvas.offsetTop,
      false
    );
    drawNew();
  }
}

function touchMoveEventHandler(e) {
  if (paint) {
    addClick(
      e.touches[0].pageX - canvas.offsetLeft,
      e.touches[0].pageY - canvas.offsetTop,
      true
    );
    drawNew();
  }
}

function setUpHandler(detectEvent) {
  removeRaceHandlers();

  canvas.addEventListener("touchstart", touchstartEventHandler);
  canvas.addEventListener("touchmove", touchMoveEventHandler);
  touchstartEventHandler(detectEvent);
}

function touchWins(e) {
  setUpHandler(false, e);
}

function removeRaceHandlers() {
  canvas.removeEventListener("touchstart", touchWins);
}

canvas.addEventListener("touchstart", touchWins);

//clear functionality
var clear = document.getElementById("Clear");
clear.addEventListener("click", function () {
  clearDrawing();
});

const clearDrawing = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  saveCanvasState();
};

//save functionality
var save = document.getElementById("Save");
save.addEventListener("click", function () {
  saveDrawing();
});

var nameImageFile;
const saveDrawing = () => {
  if (getVal() === "") {
    alert("Please provide name of this collection.");
  } else {
    alert("Saving...");
    nameImageFile = "Image_" + Date.now() + Math.random() + ".jpg";
    var link = document.createElement("a");
    var imageFile = canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
    link.href = imageFile;
    link.download = nameImageFile;
    link.target = "_blank";
    link.click();
    popup();
    clearDrawing();
  }
};

//Expand window to see collections
var expand = document.getElementById("Expand");
expand.addEventListener("click", function () {
  showCollections();
});
const showCollections = () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("collectionsView.html") });
};

// save webpage snapshot call
function popup() {
  var descriptionBox =
    getDescription() === "" ? "Description not available." : getDescription();
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      let message = {
        txt: "saveSnap",
        tabId: tabs[0].id,
        tabUrl: tabs[0].url,
        collectionName: getVal(),
        description: descriptionBox,
        canvasSavedName: nameImageFile,
      };
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  );
}
function getVal() {
  return input.value;
}
function getDescription() {
  return description.value;
}

// saving canvas state : Managing lifecycle
document.addEventListener("DOMContentLoaded", function () {
  getCanvasStateAndRestore();
});

function getCanvasStateAndRestore() {
  var dataURL = localStorage.getItem("canvasKey");
  var img = new Image();
  img.src = dataURL;
  img.onload = function () {
    context.drawImage(img, 0, 0);
  };
}

function saveCanvasState() {
  var image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  localStorage.setItem("canvasKey", image);
}
