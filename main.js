const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", handleSearch);
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keydown", callFunction);
const movieContainer = document.querySelector(".movie-container");
const placeholderHTML = document.querySelector(".placeholder");
const errorMessage = document.querySelector(".error-message");
let idArray = [];
let watchlistArray = [];
let title;

function handleSearch() {
    fetch(`http://www.omdbapi.com/?apikey=7098eb7f&s=${searchInput.value}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "False") {
                errorMessage.style.display = "block";
                placeholderHTML.style.display = "none";
            } else {
                movieContainer.style.display = "block";
                placeholderHTML.style.display = "none";
                movieContainer.innerHTML = "";
                searchInput.value = "";
                idArray = [];
                for (movie of data.Search) {
                    idArray.push(movie.imdbID);
                }
                render();
            }
        });
}
function render() {
    for (let i = 0; i < idArray.length; i++) {
        fetch(
            `http://www.omdbapi.com/?apikey=7098eb7f&i=${idArray[i]}&plot=full`
        )
            .then((response) => response.json())
            .then((data) => {
                movieContainer.innerHTML += `
                    <div class ="movie">
                        <div class="img-container">
                                <img src="${data.Poster}"
                                    alt="">
                        </div>
                        <div class="info">
                            <div class="first-line">
                                <h2 class="title">${data.Title}</h2>
                                <div class="rating">
                                    <img src="star.png" alt="">
                                    <p>${data.Ratings[0].Value}</p>
                                </div>
                            </div>
                            <div class="second-line">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <div class="add-to-watchlist">
                                    <img src="plus.png" alt="" id="add${i}" class="${data.Title}">
                                    <h4>Watchlist</h4>
                                </div>
                            </div>
                            <div class="third-line">
                                <p>${data.Plot}</p>
                            </div>
                        </div>
                    </div>
                `;
                for (let c = 0; c < idArray.length; c++) {
                    document
                        .getElementById(`add${c}`)
                        .addEventListener("click", () => {
                            let list = localStorage.getItem("watchlist");
                            if (list) {
                                list = JSON.parse(list);
                            }

                            title = document.getElementById(
                                `add${c}`
                            ).className;

                            if (list) {
                                list.unshift(title);
                            } else {
                                list = [title];
                            }
                            localStorage.setItem(
                                "watchlist",
                                JSON.stringify(list)
                            );
                        });
                }
            });
    }
}

function callFunction(event) {
    if (event.key == "Enter") {
        handleSearch();
        searchInput.value = "";
    }
}
