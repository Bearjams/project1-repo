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

var listArr = ["","rustic candle holder","mid-century barware","boho wall hanging","quilt bedspread","hardwood charcuterie board","agate coasters","end grain cutting board","reclaimed wood desk","outdoor decorative pillows","vintage credenza"];

var arrString = JSON.stringify(listArr);

var dbListString;

var currentItem;

database.ref().set(arrString);

database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    dbListString = snapshot.val();
})

var dbArr = JSON.parse(dbListString);

function addList(arr) {
    for (var i=0;i<arr.length;i++) {
        var newOption = $("<option>").val(arr[i]).text(arr[i]);
        $("#gift-items").append(newOption);
    }
}

addList(dbArr);

// addList(listArr);

$("#commit-button-div").hide();

$("#gift-items").on("click", function(){
    if ($(this).val()==="") {
        
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
                var image = response.results[i].Images[0].url_570xN
                var link = response.results[i].url;

            
                var newCard = $("<div>").addClass("card col-3 m-2");
                var cardImg = $("<img>").addClass("card-img-top").attr("src", image);
                newCard.append(cardImg);
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h5>").addClass("card-title").text(title);
                cardBody.append(cardTitle);
                var cardPrice = $("<p>").addClass("card-text").text(price);
                cardBody.append(cardPrice);
                var cardLink = $("<a>").addClass("btn btn-primary").attr("href", link).text("Link").attr("target", "_blank");
                cardBody.append(cardLink);
                newCard.append(cardBody);
                $("#etsy-images").prepend(newCard);

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

    database.ref().set(arrString);

    $("#commit-button-div").hide();
    $("#finished-div").text("Thanks for commiting to purchase the " + currentItem + "! Please go to the music page to pick out songs for the DJ.");
});

$("#new-item-button").on("click", function() {
    $("#gift-items").val("");
    $("#commit-button-div").hide();
    $("#menu-div").show();
    $("#etsy-images").empty();
})