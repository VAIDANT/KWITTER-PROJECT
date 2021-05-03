// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyB0x08D7jCrq9zhtA_lnFwqVSyyLfLKaXM",
      authDomain: "kwitter-ded09.firebaseapp.com",
      databaseURL: "https://kwitter-ded09-default-rtdb.firebaseio.com/",
      projectId: "kwitter-ded09",
      storageBucket: "kwitter-ded09.appspot.com",
      messagingSenderId: "243153509869",
      appId: "1:243153509869:web:7f04dbeddb91f0dc741be4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML +=row;
      //End code
      });});}
getData();

function addUser() {
      user_name =  document.getElementById("user_name").value;
      firebase.database().ref("/").child(user_name).update({
        purpose : "adding user"
      })
    }

function addRoom() {
  room_name=document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
  window.location = "index.html";
  localStorage.removeItem("room_name");
  localStorage.removeItem("user_name");
}