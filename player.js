
   
  
  
    //response.data[0].preview

    
        var artist = "muse";

        var queryURL = "https://api.deezer.com/search?q=" + artist + "&api_key=9f6d61036b12b504cfec594cf6f8dfa6";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            console.log(response);

            var name = response.data[0].artist.name;
            var pic = response.data[0].artist.picture;
            var link = response.data[0].artist.link;
            var preview = response.data[0].preview;



            $("#info-div").text(name)
            $("#picture-div").text(pic)
            $("#link-div").text(link)
            $("#preview-div").text(preview)

            



        });
            
    