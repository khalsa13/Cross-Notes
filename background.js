// window.addEventListener("load", () => {
//   const canvas = document.getElementById("myCanvas");
//   alert(canvas);
//   const ctx = canvas.getContext("2d");
//   //variables
//   let painting = false;

//   function startPosition(e) {
//     painting = true;
//     draw(e);
//   }

//   function finishedPosition() {
//     painting = false;
//     ctx.beginPath();
//   }
//   function draw(e) {
//     if (!painting) return;
//     ctx.lineWidth = 10;
//     ctx.lineCap = "round";
//     ctx.strokeStyle = "red";

//     ctx.lineTo(e.clientX, e.clientyY);

//     ctx.stroke();

//     ctx.beginPath();

//     ctx.moveTo(e.clientX, e.clientyY);
//   }
//   //EventListeners
//   canvas.addEventListener("mousedown", startPosition);
//   canvas.addEventListener("mouseup", finishedPosition);
//   canvas.addEventListener("mousemove", draw);
// });

// document.addEventListener("DOMContentLoaded", function (event) {
//   var btn = document.getElementById("checkButton");
//   alert(event.key);
// });

// window.addEventListener("keydown", function (event) {
//   alert("sjksa");
//   alert(event.key);
//   if (event.key === 13) {
//     alert("Enter is pressed!");
//     alert(document.getElementById("input").value);
//   }
// });
// chrome.browserAction.onClicked.addListener(function (tab) {
//   chrome.browserAction.setPopup({
//     popup: "background.html",
//   });
// });
chrome.browserAction.onClicked.addListener(function () {
  var w = 440;
  var h = 625;
  var left = screen.width / 2 + w / 2;

  chrome.windows.create(
    {
      url: "background.html",
      type: "popup",
      width: w,
      height: h,
      left: left,
      top: 65,
    },
    function (window) {}
  );
});
