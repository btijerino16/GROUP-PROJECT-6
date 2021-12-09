function createIframe(videoId) {
    var ifrm = document.createElement("iframe");
    apiURL = `https://www.youtube.com/embed/${videoId}`;
    ifrm.setAttribute("src", (apiURL));
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
        maxResults: 1,
        q: query,
        type: "video",
        videoEmbeddable: "true"
    }

    $.getJSON(URL, options).then(function (data) {
        var videoId = data.items[0].id.videoId;
        console.log(videoId);
        createIframe(videoId);
    });
}

// youtubeApi("taylor swift");
function getMovieId(movieQuery) {
    var movieQuery = "Thor";
    var imdbApiKey = "k_ta4dd4a1";
    var imdbURL = `https://imdb-api.com/en/API/SearchMovie/${imdbApiKey}/${movieQuery}`;
    
    fetch(imdbURL)
    .then(function(response){
        response.json()
        .then(function(data){
            console.log(data);
            var movieId = data.results[0].id;
            console.log("Movie ID: " + movieId);
        })
    })
};





