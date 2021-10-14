chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(request, sender, sendResponse) {
  console.log("1");
  if (request.txt === "showDetails") {
    console.log("2");
  }
}
