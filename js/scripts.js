$(document).ready(function () {
    //Set up
    $("#gif").attr('checked', true);
    let searchPage = {};
   
    let KEY = "ygmzZcKV0JozYKh0yilDu8K7F2m3ho2r&q";
    let giphyAPI = "https://api.giphy.com/v1/gifs/search?api_key="+KEY+"=SEARCH-IMAGE&limit=NUM-RETURN&offset=0&rating=g&lang=en";

    let giphyStickerAPI = "https://api.giphy.com/v1/stickers/search?api_key="+KEY+"=SEARCH-IMAGE&limit=NUM-RETURN&offset=0&rating=g&lang=en"

    searchPage.searchInput = $("#searchInput");
    searchPage.searchButton = $("#searchButton");
    searchPage.searchCount = $("#searchCount");
    searchPage.typeRadioButton = $('[name="type"]');




    //The Main Function that will run all other methods to return data 
    searchPage.getData = async function () {
        let url;
        $("#giph-display-content").empty();
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


       /* $.each(urlArray, function(index,value){
            alert(value.title + " is it");
        });*/
        $(searchPage.searchInput).val("");
        $(searchPage.searchCount).val("");
        $("#gif").attr('checked', true);

        searchPage.displayData(urlArray);

    };


    //Call the APIs and return the urls in an array
    searchPage.callAPI = async function (url) {
        let urlArray = [];
        await axios.get(url)
            .then(function (response) {
                $.each(response, function (key, val) {
                    console.log(val);
                    
                    $.each(val.data, function (key, val) {
                         let searchItem = {};
                        // console.log(val.images.downsized.url);
                       
                        searchItem.title = val.title;
                        searchItem.url = val.images.downsized.url;
                      //  urlArray.push(val.images.downsized.url);
                        urlArray.push(searchItem);
                        
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

    searchPage.createRow = function (val) {
        let title = val.title
        let url = val.url;

        let card = document.createElement("div");
       
        $(card).addClass("card text-center d-flex align-items-center");
      //  $(card).css("max-width: 200px");
        
        
        let cardBody = document.createElement("article");
         
        $(cardBody).append(val.title);
      
        
        $(cardBody).addClass("card-body");

        let image = new Image();
        image.src = url;
        $(image).addClass("img-fluid item-img");

       /* $(image).css({
            'width': '200px',
            'height': '200px'
        });*/
        $(card).append(image);
         $(card).append($(cardBody));
        return card;

    };



    searchPage.displayData = function (urlArray) {
        let giphDisplayContent = $("#giph-display-content");
        let counter = 0;
        let giphDisplay = document.createElement("div");
        $(giphDisplay).attr("id", "giph-display");
        $(giphDisplay).addClass("row justify-content-sm-center text-center d-flex align-items-center");
        $.each(urlArray, function (index, val) {
            let card = searchPage.createRow(val);
            $(giphDisplay).append(card);

            /*       if ((index) % 4 === 0) {
                alert("true");
                giphDisplay = document.createElement("div");
                $(giphDisplay).attr("id", "giph-display");
                $(giphDisplay).addClass("row");

            } else {
                giphDisplay = $('div.giph-display:last');
            }
*/

        });

        $(giphDisplayContent).append($(giphDisplay));

    };


    searchPage.searchButton.click(searchPage.getData);

});
