var searchInput = document.getElementById('search-it');
var searchForm = document.getElementById('searchForm');
var videoContainer = document.getElementById('videoContainer');
var posterContainer = document.getElementById('posterContainer');
var pastSearches = document.getElementById('pastSearches');
var clearBtn = document.getElementById('clearBtn');
// movies array
var movies = [];

loadHistory();

function handleInputSubmit(event) {
    event.preventDefault();


    // get movie name from search input
    var movieName = searchInput.value;
    // if nothing is input, return
    if (!movieName) {
        return;
    }
    getMovieInfo(movieName);

    // clear out search input
    searchInput.value = "";
}

// function createIframe(videoId) {
//     var ifrm = document.createElement("iframe");
//     apiURL = `https://www.youtube.com/embed/${videoId}`;
//     ifrm.setAttribute("src", (apiURL));
//     // ifrm.style.width = "640px";
//     // ifrm.style.height = "480px";
//     // document.body.appendChild(ifrm);

//     // set video size to fit container with 4:3 ratio
//     ifrm.style.width = "100%";
//     ifrm.style.height = "75%";
//     // append iframe to video container
//     videoContainer.append(ifrm);
// }

// function youtubeApi(query) {
//     var key = "AIzaSyD03GgsQRd4u-bPDRH7t_-yT9LEhAPUC5E";
//     var query = query;
//     var URL = 'https://youtube.googleapis.com/youtube/v3/search?';

//     var options = {
//         part: 'snippet',
//         key: key,
//         maxResults: 1,
//         q: query,
//         type: "video",
//         videoEmbeddable: "true"
//     }

//     $.getJSON(URL, options).then(function (data) {
//         var videoId = data.items[0].id.videoId;
//         console.log("Video ID: " + videoId);
//         createIframe(videoId);
//     });
// }

// youtubeApi("taylor swift");


function getMovieInfo(movie) {

    // clear out video container
    videoContainer.innerHTML = "";
    // clear out poster container
    posterContainer.innerHTML = "";

    var imdbApiKey = "k_ta4dd4a1";
    // template literal for api url with api key and movie title
    var titleApiURL = `https://imdb-api.com/en/API/SearchMovie/${imdbApiKey}/${movie}`;

    fetch(titleApiURL)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    //console.log(data);
                    saveMovies(movie);
                    // get movie Id from data
                    var movieId = data.results[0].id;
                    // console.log("Movie ID: " + movieId);
                    // use movie id in api url
                    var idApiURL = `https://imdb-api.com/en/API/Title/${imdbApiKey}/${movieId}`;
                    // get movie star from data
                    fetch(idApiURL)
                        .then(function (response) {
                            response.json()
                                .then(function (data) {
                                    // movie star
                                    var star = data.actorList[0].name;
                                    // console.log("Star: " + star);
                                    // retrieve interview video from youtube for the movie star
                                    // youtubeApi(star + "interview");

                                    // movie poster

                                    // create img element for movie poster
                                    var poster = document.createElement("img");
                                    // set the image source
                                    poster.setAttribute("src", data.image);
                                    // limit poster size to 100% of container
                                    poster.style.maxWidth = "100%";
                                    // append the poster to container
                                    posterContainer.append(poster);
                                })
                        })
                })
        })

};

// save movies to local storage
function saveMovies(movie) {
    // prevent duplicates in array
    if (movies.indexOf(movie) !== -1) {
        return;
    }
    // push movie into movies array
    movies.push(movie);
    // save movies array to local storage
    localStorage.setItem("movies", JSON.stringify(movies));
    createHistoryBtns();
};

// create buttons for search history
function createHistoryBtns() {
    // clear out past searches div before running loop
    pastSearches.innerHTML = "";
    // loop over movies array in reverse order to show most recent search first
    for (let index = movies.length - 1; index >= 0; index--) {
        // create button for each movie in array
        var pastSearchButton = document.createElement('button');
        pastSearchButton.innerText = movies[index];
        // set button class
        pastSearchButton.setAttribute("class", "waves-effect waves-light btn");
        // set button style
        pastSearchButton.style.width = "100%";
        pastSearchButton.style.margin = "2px";
        // set button data attribute
        pastSearchButton.setAttribute("data-value", movies[index]);
        // append buttons to past searches div
        pastSearches.append(pastSearchButton);
    }
}

// load previous searches
function loadHistory() {
    // get movies array from local storage
    var storedHistory = localStorage.getItem("movies");
    // if there is data in local storage, parse the data
    if (storedHistory) {
        movies = JSON.parse(storedHistory);
    }
    createHistoryBtns();
}



// Event listeners
searchForm.addEventListener('submit', handleInputSubmit);

clearBtn.addEventListener('click', function () {
    // clear local storage and html
    localStorage.clear();
    pastSearches.innerHTML = "";
    posterContainer.innerHTML = "";
    videoContainer.innerHTML = "";

})

pastSearches.addEventListener('click', function (event) {
    // use data attribute to get movie info
    var pastMovieSearch = event.target.getAttribute('data-value');
    //console.log(pastMovieSearch);
    getMovieInfo(pastMovieSearch);
})