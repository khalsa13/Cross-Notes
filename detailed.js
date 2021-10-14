window.onload = function (event) {
  chrome.runtime.onMessage.addListener(gotMessage);
  function gotMessage(request, sender, sendResponse) {
    if (request.txt === "showDetails") {
      document.getElementById("name").innerText = request.name;
      document.getElementById("description").innerText = request.description;
      document.getElementById("image1").src =
        "C://Users/ramasingh/Downloads/" + request.image1Url;
      document.getElementById("image2").src =
        "C://Users/ramasingh/Downloads/" + request.image2Url;
    }
  }
};
