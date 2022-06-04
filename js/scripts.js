$(document).ready(function () {
    //Set up
    //   const axios = require('axios');
    let searchPage = {};
    let giphyAPI = "https://api.giphy.com/v1/gifs/search?api_key=ygmzZcKV0JozYKh0yilDu8K7F2m3ho2r&q=SEARCH-IMAGE&limit=NUM-RETURN&offset=0&rating=g&lang=en";

    let giphyStickerAPI = "https://api.giphy.com/v1/stickers/search?api_key=ygmzZcKV0JozYKh0yilDu8K7F2m3ho2r&q=SEARCH-IMAGE&limit=NUM-RETURN&offset=0&rating=g&lang=en"

    searchPage.searchInput = $("#searchInput");
    searchPage.searchButton = $("#searchButton");
    searchPage.searchCount = $("#searchCount");
    searchPage.typeRadioButton = $('[name="type"]');
    
    
    //The Main Function that will run all other methods to return data 
    searchPage.getData = function () {
        let url;

        let searchVal = searchPage.searchInput.val();

        if ($("input[name='type']:checked").val() === "Gif") {
            url = giphyAPI;
        } else {
            url = giphyStickerAPI;
        }

        let updatedURL = searchPage.apiInsertSearch(url, searchVal);
        let urlArray = searchPage.callAPI(updatedURL);
        console.log(urlArray);

    };

    
    //Call the APIs and return the urls in an array
    searchPage.callAPI = function (url) {
        let urlArray = [];
        axios.get(url)
            .then(function (response) {
                $.each(response, function (key, val) {
                    $.each(val.data, function (key, val) {
                        console.log(val.images.downsized.url);
                        urlArray.push(val.images.downsized.url);

                    });
                });
                return urlArray;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };

    //Replace the static strings in the url with the values placed on the front end page. Return updated string url
    searchPage.apiInsertSearch = function (url, searchItem) {
        let updatedURL = url.replace("SEARCH-IMAGE", searchItem);
        updatedURL = updatedURL.replace("NUM-RETURN", "3");
        return updatedURL;

    };


    searchPage.searchButton.click(searchPage.getData);
    
});
