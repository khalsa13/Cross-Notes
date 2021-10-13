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
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   } else {
  //     firebase.app(); // if already initialized, use that one
  //   }
  //   db = firebase.firestore();
  //   db.settings({ timestampsInSnapshots: true });
  //   const snapshot = db.collection("NotesCollection").doc("abc.com").get();
  //   var millisecondsToWait = 4000;
  //   setTimeout(function () {
  //     alert(snapshot.docs.map((doc) => doc.data()));
  //   }, millisecondsToWait);
  // addRow("tableBody", nameCollection, imageName);
};

function addRow(tableID) {
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  //Column 1
  var cell1 = row.insertCell(0);
  var element1 = document.createElement("td");
  var text = document.createTextNode(nameCollection);
  element1.appendChild(text);
  cell1.appendChild(element1);

  //Column 2
  var cell2 = row.insertCell(1);
  var element2 = document.createElement("td");
  var anchor = document.createElement("a");
  anchor.href = "";
  element2.appendChild(anchor);
  var imgTag = document.createElement("img");
  imgTag.style.width = "75px";
  imgTag.style.height = "40px";
  imgTag.style.border = "1px solid #000000";
  imgTag.src = "C://Users/ramasingh/Downloads/" + imageName + ".png";

  imgTag.alt = "..";
  anchor.appendChild(imgTag);
  cell2.appendChild(element2);
}
//SavedImages
