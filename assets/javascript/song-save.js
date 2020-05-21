var bands = ["When Doves Cry", "Billy Jean", "Thinking Out Loud", "24K Magic", "Funky Town"];
var released;
var artist;


function displayBandInfo(artist) {


    var queryURL = "https://api.deezer.com/search?q=" + artist + "&api_key=9f6d61036b12b504cfec594cf6f8dfa6";
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var bandDiv = $("<div class='band section teal lighten-4'>");

        var rating = response.data[0].artist.name;
            console.log(rating)
        var pOne = $("<p>").text("Band Name: " + rating);

        bandDiv.append(pOne);

        released = response.data[0].preview;

        //var pTwo = $("<audio>").attr("src", released);

        var pTwo = $("<div>").html('<audio controls name="media" id="songPreview"><source src="'+ released +'" class="songPre"></audio></audio>')   

        // var newsrc = $("<source>").attr("src", released).addClass("songPre");

        // $("#songPreview").empty();

        // $("#songPreview").append(newsrc);

        //$(".songPre").prepend(pTwo);

        bandDiv.append(pTwo);

        var plot = response.data[0].title;

        var pThree = $("<p>").text("Song Name: " + plot);

        bandDiv.append(pThree);

        var imgURL = response.data[0].artist.picture;

        var image = $("<img>").attr("src", imgURL);

        bandDiv.append(image);

        var addButton = $("<button>").addClass("btn dj-add-button").attr("data-artist", rating).attr("data-song", plot).text("Add Song");

        bandDiv.append(addButton);

        $("#artists-view").prepend(bandDiv);
    });

}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < bands.length; i++) {

        var a = $("<button>");

        a.addClass("artist-btn btn");

        a.attr("data-name", bands[i]);

        a.text(bands[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-artist").on("click", function (event) {
    event.preventDefault();

    artist = $("#artist-input").val().trim();

    displayBandInfo(artist);

    bands.push(artist);

    renderButtons();

});

$(document).on("click", ".artist-btn", function(){
    
    artist = $(this).attr("data-name");

    displayBandInfo(artist);
})

renderButtons();

// Band Name
var bandName;
// Song Title
var songName;

var dbArtistName;
var dbSongTitle;

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

function addTableRow() {
    var newRow = $("<tr>");
    var newArtistTd = $("<td>").text(dbArtistName);
    newRow.append(newArtistTd);
    var newSongTd = $("<td>").text(dbSongTitle);
    newRow.append(newSongTd);
    $("#table-rows").prepend(newRow);

}

database.ref("dj-list").on("child_added", function(childSnapshot) {

    dbArtistName = childSnapshot.val().artistName;
    dbSongTitle = childSnapshot.val().songTitle;

    addTableRow();
});

$(document).on("click", ".dj-add-button", function() {

    bandName = $(this).attr("data-artist");
    songName = $(this).attr("data-song");

    var songSelectObjet = {
        artistName: bandName,
        songTitle: songName
    }

    database.ref("dj-list").push(songSelectObjet);
})

