const watchlistContainer = document.querySelector(".watchlist-container");
const placeholderHTML = document.querySelector(".placeholder");
let watchlist = JSON.parse(localStorage.getItem("watchlist"));

function watchlistRender() {
	for (let i = 0; i < watchlist.length; i++) {
		fetch(`https://www.omdbapi.com/?apikey=7098eb7f&t=${watchlist[i]}&plot=full`)
			.then((response) => response.json())
			.then((data) => {
				watchlistContainer.innerHTML += `
                    <div class="movie ${data.Title}" id="${data.Title}">
                        <div class="img-container">
                                <img src="${data.Poster}"
                                    alt="">
                        </div>
                        <div class="info">
                            <div class="first-line">
                                <h2 class="title">${data.Title}</h2>
                                <div class="rating">
                                    <img src="./pictures/star.png" alt="">
                                    <p>${data.Ratings[0].Value}</p>
                                </div>
                            </div>
                            <div class="second-line">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <div class="add-to-watchlist">
                                    <img src="./pictures/remove.png" alt="" id="remove${i}" class="${data.Title}">
                                    <h4>Remove</h4>
                                </div>
                            </div>
                            <div class="third-line">
                                <p>${data.Plot}</p>
                            </div>
                        </div>
                    </div>
                `;

				let list = localStorage.getItem("watchlist");

				if (list) {
					list = JSON.parse(list);
					for (let c = 0; c < watchlist.length; c++) {
						document.getElementById(`remove${c}`).addEventListener("click", () => {
							title = document.getElementById(`remove${c}`).className;

							if (list) {
								list.shift(title);
							}
							localStorage.setItem("watchlist", JSON.stringify(list));

							document.getElementById(`${title}`).classList.add("slide-off");
							setTimeout(() => (document.getElementById(`${title}`).style.display = "none"), 1000);
						});
					}
				}
			});
	}
}

function removePlaceholderHtml() {
	if (watchlist) {
		placeholderHTML.style.display = "none";
		watchlistRender();
	}
}
removePlaceholderHtml();
