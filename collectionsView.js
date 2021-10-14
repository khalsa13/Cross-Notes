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
var documents;
window.onload = function (event) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  db = firebase.firestore();
  db.collection("NotesCollection")
    .get()
    .then((querySnapshot) => {
      documents = querySnapshot.docs.map((doc) => doc.data());
      documents.forEach((element) => {
        addRow(
          "tableBody",
          element["name"],
          element["description"],
          element["images"][0],
          element["images"][1]
        );
      });
    });

  // document
  //   .querySelectorAll("#table tableBody")
  //   .forEach((e) => e.addEventListener("click", clickHandler));
  // var abc = document.querySelectorAll("#table tableBody");
  // console.log(abc);
};
var element1;
function addRow(tableID, nameCollection, description, imageName1, imageName2) {
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  //Column 1
  var cell1 = row.insertCell(0);
  element1 = document.createElement("td");
  element1.addEventListener("click", clickHandler);
  var text = document.createTextNode(nameCollection);
  text.id = nameCollection;
  element1.appendChild(text);
  cell1.appendChild(element1);

  //Column 2
  var cell2 = row.insertCell(1);
  var element2 = document.createElement("td");
  var text2 = document.createTextNode(description);
  element2.appendChild(text2);
  cell2.appendChild(element2);

  //Column 3
  var cell3 = row.insertCell(2);
  var element3 = document.createElement("td");
  var anchor3 = document.createElement("a");
  anchor3.href = "C://Users/ramasingh/Downloads/" + imageName1;
  anchor3.target = "_blank";
  element3.appendChild(anchor3);
  var imgTag3 = document.createElement("img");
  imgTag3.style.width = "60px";
  imgTag3.style.height = "30px";
  imgTag3.style.border = "1px solid #000000";
  imgTag3.src = "C://Users/ramasingh/Downloads/" + imageName1;

  imgTag3.alt = "..";
  anchor3.appendChild(imgTag3);
  cell3.appendChild(element3);

  // adding 2nd image in cell2 only
  var element4 = document.createElement("td");
  var anchor4 = document.createElement("a");
  anchor4.href = "C://Users/ramasingh/Downloads/" + imageName2;
  anchor4.target = "_blank";
  element4.appendChild(anchor4);
  var imgTag4 = document.createElement("img");
  imgTag4.style.width = "60px";
  imgTag4.style.height = "30px";
  imgTag4.style.border = "1px solid #000000";
  imgTag4.style.marginLeft = "10px";
  imgTag4.src = "C://Users/ramasingh/Downloads/" + imageName2;

  imgTag4.alt = "..";
  anchor4.appendChild(imgTag4);
  cell3.appendChild(element4);
}

function clickHandler() {
  var collName = this.firstChild.id,
    description,
    image1,
    image2;
  documents.forEach((element) => {
    if (element["name"] === collName) {
      description = element["description"];
      (image1 = element["images"][0]), (image2 = element["images"][1]);
    }
  });
  chrome.tabs.create({
    url: chrome.runtime.getURL("detailedCollectionItem.html"),
  });
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
          name: collName,
          description: description,
          image1Url: image1,
          image2Url: image2,
        };
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    );
  }, millisecondsToWait);
}
