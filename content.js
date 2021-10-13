window.onload = function (event) {
  canvas.height = height;
  canvas.width = width;
  console.log(width);
  console.log(window.innerWidth);
};
var body = document.body,
  html = document.documentElement;

var height = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);
var width = Math.max(
  body.scrollWidth,
  body.offsetWidth,
  html.clientWidth,
  html.scrollWidth,
  html.offsetWidth
);

var canvas = document.createElement("canvas");
canvas.style.zIndex = 4;
canvas.style.position = "absolute";
canvas.style.touchAction = "none";
canvas.style.top = "0";
canvas.style.left = "0";

body.appendChild(canvas);
var context = canvas.getContext("2d");
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

// save snapshot
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(request, sender, sendResponse) {
  if (request.txt === "saveSnap") {
    if (request.collectionName === "") {
      alert("! Please give name to your collection and then Save.");
    } else {
      alert("Saved in Collections.");
      captureScreenshot();
    }
  }
}
function captureScreenshot() {
  var container = document.body; // full page
  html2canvas(container).then(function (canvas) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.download = "html_image.png";
    link.href = canvas.toDataURL("image/png");
    link.target = "_blank";
    link.click();
  });
}
