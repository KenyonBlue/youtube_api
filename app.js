$(document).ready(function () {
    //1.get input from the users
    $(".youtubeForm").submit(function (event) {
        event.preventDefault();
        var input = $(".userInput").val();
        makeApiCall(input);
    });
    //2.use input to make api call
    function makeApiCall(userInput) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet", //Youtube API special parameter (please check documentation here https://developers.google.com/youtube/)
                maxResults: 20, //number of results per page
                key: "AIzaSyCclIq-RF7zhCJ_JnoXJBLdGvz-v2nzCB0",
                q: userInput, //shearch query from the user
                type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
            },
            function (receivedApiData) {
                //show the json array received from the API call
                //                console.log(receivedApiData);
                // if there are no results it will just empty the list
                if (receivedApiData.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                //if there are results, call the displaySearchResults
                else {
                    showApiResults(receivedApiData.items);
                }
            });
        //        console.log(userInput);
    };

    //3.using the json response, show the results
    function showApiResults(results) {
        var builtHtmlOutput = "";
        $.each(results, function (videosArrayKey, videosArrayValue) {
            //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
            builtHtmlOutput += "<div class='videos'>";
            builtHtmlOutput += "<h2>" + videosArrayValue.snippet.title + "</h2>"; //output vide title
            builtHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
            builtHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
            builtHtmlOutput += "</a>";
            builtHtmlOutput += "</div>";
        });
        $(".videoContainer").html(builtHtmlOutput);

        //        console.log(results);
        //        console.log(results[0].snippet.thumbnails.high.url);
        //        console.log(results[0].id.videoId);
        //        console.log(results[0].snippet.title);
    }
})
