$(document).ready(function () {
    //Set up
    $("#gif").attr('checked', true);
    let searchPage = {};

    let KEY = "";
    let giphyAPI = "https://api.giphy.com/v1/gifs/search?api_key=" + KEY + "=SEARCH-IMAGE&limit=NUM-RETURN&offset=0&rating=g&lang=en";

    let giphyStickerAPI = "https://api.giphy.com/v1/stickers/search?api_key=" + KEY + "=SEARCH-IMAGE&limit=NUM-RETURN&offset=0&rating=g&lang=en"

    searchPage.searchInput = $("#searchInput");
    searchPage.searchButton = $("#searchButton");
    searchPage.searchCount = $("#searchCount");
    searchPage.typeRadioButton = $('[name="type"]');
    
   /* var alterClass = function() {
      alert("resizing");
    var ww = document.body.clientWidth;
    if (ww < 768) {
      $('.xxx').removeClass('d-flex justify-content-center');
    } else if (ww >= 768) {
      $('.xxx').addClass('d-flex justify-content-center');
    };
  };
  $(window).resize(function(){
    alterClass();
  });
  //Fire it when the page first loads:
  alterClass();
*/




    //The Main Function that will run all other methods to return data 
    searchPage.getData = async function () {

        let url;
        $("#giph-display-content").empty();
        $("#return-count").empty();
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
        searchPage.typeRadioButton = urlArray.length;
        /* $.each(urlArray, function(index,value){
             alert(value.title + " is it");
         });*/
        $(searchPage.searchInput).val("");
        $(searchPage.searchCount).val("");
        //   $(searchPage.typeRadioButton).attr('checked', true);

        searchPage.displayData(urlArray);

    };


    searchPage.fieldCheck = function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');



        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    } else {
                        event.preventDefault();

                        if (!isNaN($(searchPage.searchCount).val()) || $(searchPage.searchInput) !== "") {
                            searchPage.getData();
                        } else {

                        }



                    }

                    form.classList.add('was-validated')
                }, false)
            })
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

        let updatedURL = url.replace("SEARCH-IMAGE", searchItem);
        updatedURL = updatedURL.replace("NUM-RETURN", limitTo);
        return updatedURL;

    };

    searchPage.createRow = function (val) {
        let title = val.title
        let url = val.url;

        let card = document.createElement("div");

        $(card).addClass("card text-center d-flex align-items-center");

        let cardBody = document.createElement("article");

        $(cardBody).append(val.title);


        $(cardBody).addClass("card-body");

        let image = new Image();
        image.src = url;
        $(image).addClass("img-fluid item-img");

        $(card).append(image);
        $(card).append($(cardBody));
        return card;

    };



    searchPage.displayData = function (urlArray) {
        $("#return-count").text("Found " + urlArray.length + " items");

        let giphDisplayContent = $("#giph-display-content");
        let counter = 0;
        let giphDisplay = document.createElement("div");
        $(giphDisplay).attr("id", "giph-display");
        $(giphDisplay).addClass("row d-flex justify-content-center align-items-center  ");

        $.each(urlArray, function (index, val) {
            let card = searchPage.createRow(val);
            $(giphDisplay).append(card);

        });

        $(giphDisplayContent).append($(giphDisplay));

    };


    //  searchPage.searchButton.click(searchPage.getData);
    searchPage.fieldCheck();

});