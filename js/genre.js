import { getApiKey } from "./apiKey.js";

const API_KEY = getApiKey();

async function getMoviesByGenre(genreId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
}

function movieDisplay(movies) {
  const mainScreen = document.querySelector(".topScreen");
  const subGenrelist = document.querySelector("#genreSub");

  mainScreen.innerHTML = "";
  subGenrelist.innerHTML = "";

  const mainToShow = movies[0];
  if (mainToShow) {
    const mainMovie = document.createElement("div");
    mainMovie.id = `movie-${mainToShow.id}`;
    mainMovie.innerHTML = `
      <div id="genreScreen">
        <img class="bigPoster" src="https://image.tmdb.org/t/p/w500${mainToShow.poster_path}" alt="${mainToShow.title} 포스터" />
        <img class="smallPoster" src="https://image.tmdb.org/t/p/w500${mainToShow.poster_path}" alt="${mainToShow.title} 포스터" />
        <div id="title">
          <h2>${mainToShow.title}</h2>
          <i class="fa-solid fa-star">${mainToShow.vote_average.toFixed(1)}</i>
        </div>
      </div>
    `;
    mainScreen.appendChild(mainMovie);
  }

  const movieToShow = movies.slice(1, 17);
  movieToShow.forEach((movie) => {
    const liList = document.createElement("li");
    liList.id = `movie-${movie.id}`;
    liList.classList.add("movie-item");
    liList.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터" onerror="this.src='placeholder.jpg'" />
      <h4>${movie.title}</h4>
      <i class="fa-solid fa-star">${movie.vote_average.toFixed(1)}</i>
      <i class="fa-regular fa-heart zzim"></i>
    `;
    subGenrelist.appendChild(liList);
  });
}

function loadGenreMovies(genreId) {
  getMoviesByGenre(genreId).then(movieDisplay);
}

function updateFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const genre = urlParams.get("genre");
  if (genre) {
    loadGenreMovies(genre);
  }
}

document.querySelectorAll(".folderSub a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const genreId = event.target.getAttribute("genre-id");
    if (genreId) {
      loadGenreMovies(genreId);
      history.pushState(null, "", `?genre=${genreId}`);
    }
  });
});

window.addEventListener("load", updateFromUrl);
window.addEventListener("popstate", updateFromUrl);

// 영화 항목 클릭 이벤트 처리
document.addEventListener('click', function(event) {
  const movieElement = event.target.closest('[id^="movie-"]');
  if (movieElement) {
    const movieId = movieElement.id.split('-')[1];
    // 여기에 상세 페이지로 이동하는 코드를 추가하세요
    console.log(`상세 페이지로 이동: 영화 ID ${movieId}`);
  }
});