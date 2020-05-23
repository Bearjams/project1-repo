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

$("#submit").on("click", function(){
    var fromInput = $("#from").val().trim();
    var messageInput = $("#message").val().trim();

    var newMessgeObject = {
        from: fromInput,
        message: messageInput
    }

    database.ref("messages").push(newMessgeObject);

    $("#from").val("");
    $("#message").val("");
})

