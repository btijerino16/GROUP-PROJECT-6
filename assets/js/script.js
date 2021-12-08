$(document).ready(function () {

    var key = "AIzaSyD03GgsQRd4u-bPDRH7t_-yT9LEhAPUC5E";
    var q = "ANY_TITLE_HERE";
    var URL = 'https://youtube.googleapis.com/youtube/v3/search?';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        q: q,
        type: "video"
    }

    loadId();

    function loadId() {
        $.getJSON(URL, options, function (data) {
            var videoId = data.items[0].id.videoId;
            console.log(videoId);
        });
    }
});

