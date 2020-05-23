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

        var rating = response.data[0].artist.name;
        released = response.data[0].preview;
        var songName = response.data[0].title;
        var imgURL = response.data[0].artist.picture_big;

        var newCardCol = $("<div>").addClass("col s6 m6 l6");

        var newCard = $("<div>").addClass("card hoverable");

        var cardImg = $("<div>").addClass("card-image").append($("<img>").attr("src", imgURL));
        newCard.append(cardImg);

        var cardContent = $("<div>").addClass("card-content");
        var cardTitle = $("<p>").addClass("truncate").text("Band Name: " + rating);
        cardContent.append(cardTitle);

        var cardPrice = $("<p>").text("Song Name: " + songName);
        cardContent.append(cardPrice);
        newCard.append(cardContent);

        var cardPre =$("<div>").addClass("card-preview").html('<audio controls name="media" id="songPreview"><source src="' + released + '" class="songPre"></audio></audio>');
        newCard.append(cardPre);
        console.log(rating);

        var addButton = $("<button>").addClass("btn dj-add-button").attr("data-artist", rating).attr("data-song", songName).text("Add Song");

        newCard.append(addButton);

        newCardCol.append(newCard);

        $("#artists-view").prepend(newCardCol);
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

    $("#artist-input").val("");

    displayBandInfo(artist);

    bands.push(artist);

    renderButtons();

});

$(document).on("click", ".artist-btn", function () {

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

database.ref("dj-list").on("child_added", function (childSnapshot) {

    dbArtistName = childSnapshot.val().artistName;
    dbSongTitle = childSnapshot.val().songTitle;

    addTableRow();
});

$(document).on("click", ".dj-add-button", function () {

    bandName = $(this).attr("data-artist");
    songName = $(this).attr("data-song");

    var songSelectObjet = {
        artistName: bandName,
        songTitle: songName
    }

    database.ref("dj-list").push(songSelectObjet);
})

