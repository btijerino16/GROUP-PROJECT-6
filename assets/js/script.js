function createIframe(videoId){
    var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", ("https://www.youtube.com/embed/" + videoId));
        ifrm.style.width = "640px";
        ifrm.style.height = "480px";
        document.body.appendChild(ifrm);
}

function youtubeApi(query) {
    var key = "AIzaSyD03GgsQRd4u-bPDRH7t_-yT9LEhAPUC5E";
    var query = query;
    var URL = 'https://youtube.googleapis.com/youtube/v3/search?';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        q: query,
        type: "video"
    }

    $.getJSON(URL, options).then(function (data) {
        var videoId = data.items[0].id.videoId;
        console.log(videoId);
        createIframe(videoId);
    });
}

youtubeApi("taylor swift");


