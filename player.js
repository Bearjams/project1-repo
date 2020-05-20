
   
  
  
    //response.data[0].preview

    //var bands = ["muse", "gorillaz", "incubus"]

    //function displayArtistData(){

        var artist = "gorillaz";

        var queryURL = "https://api.deezer.com/search?q=" + artist + "&api_key=9f6d61036b12b504cfec594cf6f8dfa6";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            $("#info-div").text(JSON.stringify(response));
            // $("#picture-div").text(JSON.stringify(response));
            // $("##link-div").text(JSON.stringify(response));
            // $("#info-div").text(JSON.stringify(response));
            console.log(response);

            var name = response.data[i].artist.name;
            var pic = response.data[i].artist.picture;
            var link = response.data[i].artist.title;
            var preview = response.data[i].preview;
            $("#info-div").text(name)
            $("#picture-div").text(pic)
            $("#link-div").text(link)
            $("#preview-div").text(preview)
        });
    //}    
    
    // $("#find-artist").on("click", function(event){

    //   event.preventDefault();

    //   var artist = $("#artist-input").val();

    //   var queryURL = "https://api.deezer.com/search?q=" + artist + "&api_key=9f6d61036b12b504cfec594cf6f8dfa6";

    //   $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   }).then(function(response){
    //     $("#artist-view").text(JSON.stringify(response))
    //   })
    // })

    
    // function renderButtons(){

    //   $("#buttons-view").empty();

    //   for (var i = 0; i < bands.length; i++){

    //     var a = $("<button>");

    //     a.addClass("band");
        
    //     a.attr("data-name", bands[i]);

    //     a.text(bands[i]);

    //     $("#buttons-view").append(a)
    //   }


    // }

    // $("#add-artist").on("click", function(event){
    //   event.preventDefault();

    //   var artist = $("#artist-input").val().trim()

    //   bands.push(artist);
    //   console.log(bands);

    //   renderButtons()
    // })

    // $(document).on("click", ".band", displayArtistData);

    // renderButtons