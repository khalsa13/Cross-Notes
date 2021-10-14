var db;
//firebase firestore collection
const firebaseConfig = {
  apiKey: "AIzaSyDKMn4r0jZTOtQzC21qHU3pn0Q_Z7SLH3Q",
  authDomain: "cross-notes.firebaseapp.com",
  projectId: "cross-notes",
  storageBucket: "cross-notes.appspot.com",
  messagingSenderId: "1094186463198",
  appId: "1:1094186463198:web:a918c132f09751abf8f74f",
  measurementId: "G-9L4D06W3RX",
};
window.onload = function (event) {
  //notifyMe();
  canvas.height = height;
  canvas.width = width;
  console.log(width);
  console.log(window.innerWidth);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  db = firebase.firestore();
  //storage Image references
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
    var container = document.body; // full page
    var imageFile;
    var nameImageFile = "Image_" + Date.now() + Math.random() + ".jpg";

    html2canvas(container).then(function (canvas) {
      var link = document.createElement("a");
      imageFile = canvas
        .toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream");
      link.href = imageFile;
      link.download = nameImageFile;
      link.target = "_blank";
      link.click();
    });
    var millisecondsToWait = 2000;
    setTimeout(function () {
      var endLength = request.tabUrl.length < 29 ? request.tabUrl.length : 20;
      console.log(request.tabUrl.substring(9, endLength));
      db.collection("NotesCollection")
        .doc(request.tabUrl.substring(9, endLength))
        .set({
          name: request.collectionName,
          description: request.description,
          images: [nameImageFile, request.canvasSavedName],
        })
        .then((result) => {
          console.log("success", result);
        });
    }, millisecondsToWait);
  }
}

// Showing notification
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // Whatever the user answers, we make sure we store the information
      if (!("permission" in Notification)) {
        Notification.permission = permission;
      }

      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  } else {
    alert(`Permission is ${Notification.permission}`);
  }
}
