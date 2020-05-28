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

// Initialize Materialize Select dropdown
$(document).ready(function(){
    $('select').formSelect();
  });

var database = firebase.database();



var arrString;

var dbListString;

var currentItem;

var dbArrString = localStorage.getItem("localDbArr");

var dbArr = JSON.parse(dbArrString);



function addList(arr) {
    for (var i=0;i<arr.length;i++) {
        var newOption = $("<option>").val(arr[i]).text(arr[i]);
        $("#gift-items").append(newOption);
    }
}

addList(dbArr);



$("#commit-button-div").hide();

$("#gift-items").on("change", function(){
    if ($(this).val()==="Pick a gift") {
        
    } else {

        $("#menu-div").hide();
        console.log($(this).val());

        currentItem = $(this).val();

        var queryURL = "https://openapi.etsy.com/v2/listings/active?api_key=m9m58hszwc8pek4cyyk6r3vk&includes=Images&tags=" + $(this).val();
        
        console.log(queryURL);

        $.ajax(
            {url: queryURL,
            method: "GET"}
        ).then(function(response) {
                
            for (var i=0;i < 10;i++ ) {
                var title = response.results[i].title;
            
                var price = response.results[i].price;
                var image = response.results[i].Images[0].url_170x135;
                var link = response.results[i].url;

                var newCardCol = $("<div>").addClass("col s6 m4 l3")
                var newCard = $("<div>").addClass("card hoverable");
                var cardImg = $("<div>").addClass("card-image").append($("<img>").attr("src", image));
                newCard.append(cardImg);
                
                var cardContent = $("<div>").addClass("card-content");
                var cardTitle = $("<p>").addClass("truncate").text(title);
                cardContent.append(cardTitle);
                var cardPrice = $("<p>").text(price);
                cardContent.append(cardPrice);
                newCard.append(cardContent);

                var cardAction = $("<div>").addClass("card-action");
                var cardLink = $("<a>").addClass("btn").attr("href", link).text("Link").attr("target", "_blank");
                cardAction.append(cardLink);
                newCard.append(cardAction);

                newCardCol.append(newCard);
                $("#etsy-images").prepend(newCardCol);

                $("#commit-button-div").show();
            }

        });
    }
});

$("#commit-button").on("click", function(){
    // returns array with currentItem removed
    var filteredArr = dbArr.filter(e => e !== currentItem);
    console.log(filteredArr);

    arrString = JSON.stringify(filteredArr);

    database.ref("registry").set(arrString);

    $("#commit-button-div").hide();
    $("#finished-div").text("Thanks for commiting to purchase the " + currentItem + "! Please go to the music page to pick out songs for the DJ.");
});

$("#new-item-button").on("click", function() {
    $("#gift-items").val("Pick a gift");
    $("#commit-button-div").hide();
    $("#menu-div").show();
    $("#etsy-images").empty();
})