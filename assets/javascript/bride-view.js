// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBb-4k_e5ZI-6O-SqnclcYNNIzhOfp6gpQ",
    authDomain: "etsy-wedding.firebaseapp.com",
    databaseURL: "https://etsy-wedding.firebaseio.com",
    projectId: "etsy-wedding",
    storageBucket: "etsy-wedding.appspot.com",
    messagingSenderId: "579384460569",
    appId: "1:579384460569:web:00b6e0144655db37d4f188"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref("registry").on("value", function(snapshot) {
    $("#registry").empty();
    dbListString = snapshot.val();
    var dbArr = JSON.parse(dbListString);

    for (var i=0;i<dbArr.length;i++) {
        if (dbArr[i]==="Pick a gift") {
           
        } else {
            var newItem = $("<p>").text(dbArr[i]);
            $("#registry").append(newItem);
        }
    }
});

database.ref("dj-list").on("child_added", function(childSnapshot) {

    dbArtistName = childSnapshot.val().artistName;
    dbSongTitle = childSnapshot.val().songTitle;

    var newSong = $("<p>").text(dbArtistName + " - " + dbSongTitle);

    $("#songs").append(newSong);
});

database.ref("messages").on("child_added", function(childSnapshot) {

    dbFromName = childSnapshot.val().from;
    dbMessage = childSnapshot.val().message;

    var newMessage = $("<p>").text(dbFromName + " : " + dbMessage);

    $("#messages").append(newMessage);
});