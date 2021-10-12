chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  var w = 440;
  var h = 625;
  var left = parseInt(screen.width / 2 + w / 2);

  chrome.windows.create(
    {
      url: "popup.html",
      type: "popup",
      width: w,
      height: h,
      left: left,
      top: 70,
    },
    function (window) {}
  );

  let msg = {
    txt: "writeOnWeb",
  };
  chrome.tabs.sendMessage(tab.id, msg);
}
