var searchInput = document.getElementById('search-it');
var searchForm = document.getElementById('searchForm');
var videoContainer = document.getElementById('videoContainer');

function handleInputSubmit(event) {
    event.preventDefault();
    // get movie name from search input
    var movieName = searchInput.value;
    console.log("Movie name: " + movieName);

    getMovieStars(movieName);

}

function createIframe(videoId) {
    var ifrm = document.createElement("iframe");
    apiURL = `https://www.youtube.com/embed/${videoId}`;
    ifrm.setAttribute("src", (apiURL));
    ifrm.style.width = "640px";
    ifrm.style.height = "480px";
    // document.body.appendChild(ifrm);
    videoContainer.append(ifrm);
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
        console.log("Video ID: " + videoId);
        createIframe(videoId);
    });
}

// youtubeApi("taylor swift");


function getMovieStars(movieQuery) {
    // var movieQuery = "Iron Man";
    var imdbApiKey = "k_ta4dd4a1";
    var titleApiURL = `https://imdb-api.com/en/API/SearchMovie/${imdbApiKey}/${movieQuery}`;

    fetch(titleApiURL)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    // get movie Id from data
                    var movieId = data.results[0].id;
                    console.log("Movie ID: " + movieId);
                    // use movie id in api url
                    var idApiURL = `https://imdb-api.com/en/API/Title/${imdbApiKey}/${movieId}`;
                    // get movie star from data
                    fetch(idApiURL)
                        .then(function (response) {
                            response.json()
                                .then(function (data) {
                                    var star = data.actorList[0].name;
                                    console.log("Star: " + star);
                                    // retrieve the videos from youtube for the movie star
                                    youtubeApi(star);
                                })
                        })
                })
        })

};


// Event listeners
searchForm.addEventListener('submit', handleInputSubmit);






