
    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=muse",
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    //         "x-rapidapi-key": "6b3619b9a7mshcc2e6f44e1b0aa2p176a04jsn19a4d15d645c"
    //     }
    // }

    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });

    //function displayInstrument() {
        var artist = "muse";

        var queryURL = "https://api.deezer.com/search?q=" + artist + "&api_key=9f6d61036b12b504cfec594cf6f8dfa6";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            console.log(response);
            });
            
    //}        