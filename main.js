const paintCanvas = document.querySelector(".js-paint");
const context = paintCanvas.getContext("2d");
context.lineCap = "round";

const colorPicker = document.querySelector(".js-color-picker");

colorPicker.addEventListener("change", (event) => {
  context.strokeStyle = event.target.value;
});

const lineWidthRange = document.querySelector(".js-line-range");
const lineWidthLabel = document.querySelector(".js-range-value");

lineWidthRange.addEventListener("input", (event) => {
  const width = event.target.value;
  lineWidthLabel.innerHTML = width;
  context.lineWidth = width;
});

let x = 0,
  y = 0;
let isMouseDown = false;

const stopDrawing = () => {
  isMouseDown = false;
};
const startDrawing = (event) => {
  isMouseDown = true;
  [x, y] = [event.offsetX, event.offsetY];
};
const drawLine = (event) => {
  if (isMouseDown) {
    const newX = event.offsetX;
    const newY = event.offsetY;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(newX, newY);
    context.stroke();
    //[x, y] = [newX, newY];
    x = newX;
    y = newY;
  }
};
const clearDrawing = () => {
  context.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
  x = [];
  y = [];
  isMouseDown = false;
};
const saveDrawing = () => {
  var image = paintCanvas
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
paintCanvas.addEventListener("mousedown", startDrawing);
paintCanvas.addEventListener("mousemove", drawLine);
paintCanvas.addEventListener("mouseup", stopDrawing);
paintCanvas.addEventListener("mouseout", stopDrawing);
