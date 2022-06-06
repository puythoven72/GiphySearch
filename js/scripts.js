$(document).ready(function () {
    //Set up
    $("#gif").attr('checked', true);
    let searchPage = {};
    let giphyAPI = "https://api.giphy.com/v1/gifs/search?api_key=ygmzZcKV0JozYKh0yilDu8K7F2m3ho2r&q=SEARCH-IMAGE&limit=NUM-RETURN&offset=0&rating=g&lang=en";

    let giphyStickerAPI = "https://api.giphy.com/v1/stickers/search?api_key=ygmzZcKV0JozYKh0yilDu8K7F2m3ho2r&q=SEARCH-IMAGE&limit=NUM-RETURN&offset=0&rating=g&lang=en"

    searchPage.searchInput = $("#searchInput");
    searchPage.searchButton = $("#searchButton");
    searchPage.searchCount = $("#searchCount");
    searchPage.typeRadioButton = $('[name="type"]');
    searchPage.typeRadioButton



    //The Main Function that will run all other methods to return data 
    searchPage.getData = async function () {
        let url;

        let searchVal = searchPage.searchInput.val();
        let searchLimit = searchPage.searchCount.val();
        if ($("input[name='type']:checked").val() === "Gif") {
            url = giphyAPI;
        } else {
            url = giphyStickerAPI;
        }

        let updatedURL = searchPage.apiInsertSearch(url, searchVal, searchLimit);
        let urlArray = [];
        urlArray = await searchPage.callAPI(updatedURL);


        alert(urlArray);
        searchPage.displayData(urlArray);

    };


    //Call the APIs and return the urls in an array
    searchPage.callAPI = async function (url) {
        let urlArray = [];
        await axios.get(url)
            .then(function (response) {
                $.each(response, function (key, val) {
                    $.each(val.data, function (key, val) {
                        // console.log(val.images.downsized.url);
                        urlArray.push(val.images.downsized.url);
                    });
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        return urlArray;
    };

    //Replace the static strings in the url with the values placed on the front end page. Return updated string url
    searchPage.apiInsertSearch = function (url, searchItem, limitTo) {
        alert(limitTo);
        let updatedURL = url.replace("SEARCH-IMAGE", searchItem);
        updatedURL = updatedURL.replace("NUM-RETURN", limitTo);
        return updatedURL;

    };

    searchPage.displayData = function (urlArray) {
        let giphDisplayContent = $("#giph-display-content");
        $.each(urlArray, function (index, val) {
            let giphDisplay = document.createElement("div");
            $(giphDisplay).attr("id", "giph-display");

            let card = document.createElement("div");
            $(card).addClass("card");




            let image = new Image();
            image.src = val;
            $(image).addClass("img-fluid");

            $(image).css({
                'width': '200px',
                'height': '200px'
            });

            // $(giphDisplayContent).append(image);
            $(giphDisplay).append(image);
            $(card).append($(giphDisplay));

           
            $(giphDisplayContent).append($(card));
            
            console.log(val + " is the val added");
        });

        //  $(giphDisplayContent).addClass( "card" );
    };


    searchPage.searchButton.click(searchPage.getData);

});
