window.onload = function (event) {
  chrome.runtime.onMessage.addListener(gotMessage);
  function gotMessage(request, sender, sendResponse) {
    console.log(request);
    if (request.txt === "showDetails") {
      document.getElementById("name").innerText = request.name;
      document.getElementById("description").innerText = request.description;
      document.getElementById("image1").src =
        "C://Users/babnishvyas/Downloads/" + request.image1Url;
      document.getElementById("anchor1").href =
          "C://Users/babnishvyas/Downloads/" + request.image1Url;
      document.getElementById("image2").src =
        "C://Users/babnishvyas/Downloads/" + request.image2Url;
      document.getElementById("anchor2").href =
          "C://Users/babnishvyas/Downloads/" + request.image2Url;
    }
  }
};
