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
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(msg, sender, sendResponse) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  db = firebase.firestore();
  console.log("1");
  if ((msg.type = "ACTIVITY_HISTORY_READY")) {
    console.log(msg.url);
    db.collection("NotesCollection")
      .get()
      .then((querySnapshot) => {
        documents = querySnapshot.docs.map((doc) => {
          console.log(doc);
          if (doc.id == msg.url) {
            var element = doc.data();
            console.log(element);
            chrome.tabs.create({
              url: chrome.runtime.getURL("detailedCollectionItem.html"),
            });
            console.log(element["name"]);
            console.log(element["description"]);
            console.log(element["image1"]);
            console.log(element["image2"]);
            var millisecondsToWait = 500;
            setTimeout(function () {
              chrome.tabs.query(
                {
                  active: true,
                  currentWindow: true,
                },
                (tabs) => {
                  let message = {
                    txt: "showDetails",
                    name: element["name"],
                    description: element["description"],
                    image1Url: element["images"][0],

                    image2Url: element["images"][1],
                  };
                  chrome.tabs.sendMessage(tabs[0].id, message);
                }
              );
            }, millisecondsToWait);
          }
        });
      });
  }
}
