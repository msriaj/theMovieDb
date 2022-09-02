const imageFirst = "https://image.tmdb.org/t/p/w500/";
const apiKey = "b400cd2f4eb6a56fbb11017759c2c9f6"


const loadData = async (urlParam, lastParam = "") => {

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
        console.log(movie);
        const backMovieImage = imageFirst + movie.backdrop_path;
        const poster = imageFirst + movie.poster_path;
        const overview = movie.overview
        const movieDiv = document.createElement("div")
        movieDiv.innerHTML = `
                            <div class="movie_card" onClick="movieDetails(${movie.id})">
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
    document.getElementById("loading").style.display = "block";


    const searchText = document.getElementById("searchbox").value;
    let { results } = await loadData("search/movie", `query=${searchText == "" ? "marvel" : searchText}&page=1&include_adult=false`)
    document.getElementById("movie-list").innerHTML = "";
    document.getElementById("main").style.display = "flex"
    document.getElementById("details").style.display = "none"
    const movieList = document.getElementById("movie-list");
    results.forEach(movie => {
        const backMovieImage = imageFirst + movie.backdrop_path;
        const poster = imageFirst + movie.poster_path;
        const overview = movie.overview
        const movieDiv = document.createElement("div")
        movieDiv.innerHTML = `
                 <div class="movie_card" onClick="movieDetails(${movie.id})">
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
    document.getElementById("loading").style.display = "none";
});

const movieDetails = async (id) => {
    document.getElementById("loading").style.display = "block";
    document.getElementById("main").style.display = "none"
    document.getElementById("details").style.display = "block"

    const { genres, tagline, poster_path, backdrop_path, title, runtime, release_date, popularity, overview, vote_count } = await loadData(`movie/${id}`);

    document.getElementById("details").innerHTML = `
    <style>.hero:before {background: linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, 1)), url("${imageFirst + backdrop_path}"); background-size:cover}</style>
            <div class="movie-card-2">
                <div class="container2"><a href="#"><img
                            src="${imageFirst + poster_path}" alt="cover"
                            class="cover"  width="180px"/></a>
                    <div class="hero">
                        <div class="details">
                            <div class="title1"> ${title}  </div>
                            <div class="title2"> ${tagline} </div>
                            <fieldset class="rating"><input type="radio" id="star5" name="rating" value="5" /><label
                                    class="full" for="star5" title="Awesome - 5 stars"></label><input type="radio"
                                    id="star4half" name="rating" value="4 and a half" /><label class="half"
                                    for="star4half" title="Pretty good - 4.5 stars"></label><input type="radio"
                                    id="star4" name="rating" value="4" checked /><label class="full" for="star4"
                                    title="Pretty good - 4 stars"></label><input type="radio" id="star3half"
                                    name="rating" value="3 and a half" /><label class="half" for="star3half"
                                    title="Meh - 3.5 stars"></label><input type="radio" id="star3" name="rating"
                                    value="3" /><label class="full" for="star3" title="Meh - 3 stars"></label><input
                                    type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half"
                                    for="star2half" title="Kinda bad - 2.5 stars"></label><input type="radio" id="star2"
                                    name="rating" value="2" /><label class="full" for="star2"
                                    title="Kinda bad - 2 stars"></label><input type="radio" id="star1half" name="rating"
                                    value="1 and a half" /><label class="half" for="star1half"
                                    title="Meh - 1.5 stars"></label><input type="radio" id="star1" name="rating"
                                    value="1" /><label class="full" for="star1"
                                    title="Sucks big time - 1 star"></label><input type="radio" id="starhalf"
                                    name="rating" value="half" /><label class="half" for="starhalf"
                                    title="Sucks big time - 0.5 stars"></label></fieldset><span class="likes">${vote_count}
                                likes</span>
                        </div>

                    </div>

                    <div class="description">
                        <div class="column1">
          <span class="tag">${genres[0].name ? genres[0].name : ""}</span>



         </div >

            <div class="column2">
                <p> ${overview} </p>
                <p style="color:#000; border-bottom:#ddd 1px solid;margin-top:10px"><b>Runtime:</b>${runtime} m</p>
                <p style="color:#000; border-bottom:#ddd 1px solid;margin-top:10px"><b>Release Date:</b> ${release_date}</p>
                <p style="color:#000; border-bottom:#ddd 1px solid;margin-top:10px"> <b>Popularity:</b> ${popularity}</p>
                
                

            </div>

                    </div >

                </div >

            </div >

    `
    document.getElementById("loading").style.display = "none";

}