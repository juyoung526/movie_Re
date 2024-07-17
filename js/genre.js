import { getApiKey } from "./apiKey.js";

const API_KEY = getApiKey();

async function getMoviesByGenre(genreId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
  // console.log(data);
}

function movieDisplay(movies) {
  const mainScreen = document.querySelector(".topScreen");
  const subGenrelist = document.querySelector("#genreSub");

  mainScreen.innerHTML = "";
  subGenrelist.innerHTML = "";

  const mainToShow = movies[0];
  if (mainToShow) {
    const mainMovie = document.createElement("div");
    mainMovie.innerHTML = `
        <div id="genreScreen">
         <img class="bigPoster" src="https://image.tmdb.org/t/p/w500${
           mainToShow.poster_path
         }" alt="${mainToShow.title} 포스터" />
        <img class="smallPoster" src="https://image.tmdb.org/t/p/w500${
          mainToShow.poster_path
        }" alt="${mainToShow.title} 포스터" />
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
    liList.innerHTML = `
     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    } 포스터" />
          <h4>${movie.title}</h4>
          <i class="fa-solid fa-star">${movie.vote_average.toFixed(1)}</i>
          <i class="fa-regular fa-heart zzim"></i>
          <i class="fa-solid fa-heart zzim on"></i>
    `;
    subGenrelist.appendChild(liList);
  });
}

// drama.addEventListener("click", () => {
//   getMoviesByGenre(18);
//   console.log("드라마장르");
// });

// thriller.addEventListener("click", () => {
//   getMoviesByGenre([53, 27]);
//   console.log("스릴러장르");
// });

// romance.addEventListener("click", () => {
//   getMoviesByGenre(10749);
//   console.log("로맨스장르");
// });

// animation.addEventListener("click", () => {
//   getMoviesByGenre(16);
//   console.log("애니장르");
// });

function update() {
  const urlParams = new URLSearchParams(window.location.search);
  const genre = urlParams.get("genre");
  console.log(genre);

  if (genre) {
    getMoviesByGenre(genre);
  }
}

document.querySelectorAll(".folderSub a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const genreId = event.target.getAttribute("data-genre-id");
    getMoviesByGenre(genreId).then(movieDisplay);
    history.pushState(null, "", `?genre=${genreId}`);
    update();
  });
});

window.addEventListener("load", update);
// 뒤로/앞으로 버튼 클릭 시 URL 파라미터에 따라 영화 로드
window.addEventListener("popstate", update);
