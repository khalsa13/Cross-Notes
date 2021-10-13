"use strict";
const canvas = document.querySelector(".sheet");
const context = canvas.getContext("2d");

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

const clearDrawing = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};
const saveDrawing = () => {
  var image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.

  window.location.href = image; // it will save locally
};
document.addEventListener("DOMContentLoaded", function () {
  var clear = document.getElementById("Clear");
  clear.addEventListener("click", function () {
    clearDrawing();
  });
  var save = document.getElementById("Save");
  save.addEventListener("click", function () {
    saveDrawing();
  });
});

function getVal() {
  const val = document.querySelector("input").value;
  console.log(val);
}

// save Collections listener and message sender
function popup() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, tabs[0].document.canvas);
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("snap").addEventListener("click", popup);
});
