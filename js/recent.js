import { getApiKey } from "./apiKey.js";

const API_KEY = getApiKey();

async function getMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  );
  const data = await response.json();
  return data.results;
}

async function displayMovies() {
  try {
    const movies = await getMovies();
    movieDisplay(movies);
  } catch (error) {
    console.error("Error fetching or displaying movies:", error);
  }
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
            <i class="fa-solid fa-star">${mainToShow.vote_average.toFixed(
              1
            )}</i>
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

displayMovies();
