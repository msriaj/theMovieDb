const imageFirst = "https://image.tmdb.org/t/p/w500/"
const loadData = async (urlParam, lastParam = "") => {
    const apiKey = "b400cd2f4eb6a56fbb11017759c2c9f6"
    const url = `https://api.themoviedb.org/3/${urlParam}?api_key=${apiKey}&language=en-US&${lastParam}`
    let fetchUrl = await fetch(url)
    //use string literals
    let data = await fetchUrl.json();
    return data;
}


const loadGenre = async () => {
    let data = await loadData("genre/movie/list");
    const genreList = document.getElementById("genre-list");
    data.genres.forEach(genre => {
        const a = document.createElement("a");
        a.innerText = genre.name;
        genreList.appendChild(a)
    });
}

loadGenre();


const loadMovieList = async () => {
    let { results } = await loadData("discover/movie",)

    const movieList = document.getElementById("movie-list");
    results.forEach(movie => {
        const backMovieImage = imageFirst + movie.backdrop_path;
        const poster = imageFirst + movie.poster_path;
        const overview = movie.overview
        const movieDiv = document.createElement("div")
        movieDiv.innerHTML = `
                            <div class="movie_card">
                    <div class="info_section">
                        <div class="movie_header">
                            <img class="locandina"
                                src="${poster}" />
                            <h1>${movie.title}</h1>
                            <h4> ${movie.release_date}</h4>
                            <span class="minutes">117 min</span>
                            <p class="type">Action, Crime, Fantasy</p>
                        </div>
                        <div class="movie_desc">
                            <p class="text">
                                 ${overview.split(" ").splice(0, 30).join(" ")}
                            </p>
                        </div>

                    </div>
                    <div class="blur_back"
                        style='background: url("${backMovieImage}"); background-position: right center !important; background-size: cover;'>
                    </div>
                </div>

        `;
        movieList.appendChild(movieDiv);
    })

}

loadMovieList()
document.getElementById("searchbtn").addEventListener('click', async () => {
    const searchText = document.getElementById("searchbox").value;
    let { results } = await loadData("search/movie", `query=${searchText}&page=1&include_adult=false`)

    document.getElementById("movie-list").innerHTML = "";

    const movieList = document.getElementById("movie-list");
    results.forEach(movie => {
        const backMovieImage = imageFirst + movie.backdrop_path;
        const poster = imageFirst + movie.poster_path;
        const overview = movie.overview
        const movieDiv = document.createElement("div")
        movieDiv.innerHTML = `
                            <div class="movie_card">
                    <div class="info_section">
                        <div class="movie_header">
                            <img class="locandina"
                                src="${poster}" />
                            <h1>${movie.title}</h1>
                            <h4> ${movie.release_date}</h4>
                            <span class="minutes">117 min</span>
                            <p class="type">Action, Crime, Fantasy</p>
                        </div>
                        <div class="movie_desc">
                            <p class="text">
                                 ${overview.split(" ").splice(0, 30).join(" ")}
                            </p>
                        </div>

                    </div>
                    <div class="blur_back"
                        style='background: url("${backMovieImage}"); background-position: right center !important; background-size: cover;'>
                    </div>
                </div>

        `;
        movieList.appendChild(movieDiv);
    })
})