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

room_name=localStorage.getItem("room_name");
user_name =localStorage.getItem("user_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
      //start code
         console.log(firebase_message_id);
         console.log(message_data);
         Name = message_data["name"];
         message = message_data["message"];
         like = message_data["like"];
         name_with_tag = "<h4> '"+ Name +"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>";
         span_with_tag ="<span class='glyphicon glyphicon-heart' style='color:red;'>Like: "+ like +"</span></button><hr>";

         row = name_with_tag + message_with_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML+=row;
      //end code
      } });  }); }
getData();

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      })
}

function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}

function updatelike(message_id) {
      console.log("clicked on like button - "+message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}