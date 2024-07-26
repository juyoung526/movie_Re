import { getApiKey } from "./apiKey.js";

const API_KEY = getApiKey();

async function fetchMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function updateMovieInfo(movieElement, movie) {
  const moviePoster = movieElement.querySelector(".moviePoster");
  const movieName = movieElement.querySelector(".movieName");
  const rating = movieElement.querySelector(".rating");

  if (moviePoster && movieName && rating) {
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieName.textContent = movie.title;
    rating.textContent = movie.vote_average.toFixed(1);
    movieElement.id = `movie-${movie.id}`; // ID 설정
  }
}

async function displayMovies(type) {
  const url =
    type === "korea"
      ? `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const movies = await fetchMovies(url);
  const movieElements = Array.from(
    document.querySelectorAll(`.${type} .movie`)
  );

  movieElements.forEach((movieElement, index) => {
    if (movies[index]) {
      updateMovieInfo(movieElement, movies[index]);
    }
  });

  showMovies(0, movieElements);

  return movieElements;
}

function showMovies(startIndex, movies) {
  movies.forEach((movie, index) => {
    movie.style.display =
      index >= startIndex && index < startIndex + 4 ? "block" : "none";
  });
}

function changeSlide(btn, movies, startIndex, direction) {
  btn.addEventListener("click", function () {
    startIndex.value += direction * 4;
    if (startIndex.value < 0) startIndex.value = 0;
    if (startIndex.value >= movies.length) startIndex.value = movies.length - 4;
    showMovies(startIndex.value, movies);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const koreaMovies = await displayMovies("korea");
  const globalMovies = await displayMovies("global");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const nextBtns = document.querySelectorAll(".next-btn");

  const startIndex = { value: 0 };
  const startIndex2 = { value: 0 };

  changeSlide(nextBtns[0], koreaMovies, startIndex, 1);
  changeSlide(prevBtns[0], koreaMovies, startIndex, -1);
  changeSlide(nextBtns[1], globalMovies, startIndex2, 1);
  changeSlide(prevBtns[1], globalMovies, startIndex2, -1);
});

document.addEventListener("click", function (event) {
  const movieElement = event.target.closest(".movie");
  if (movieElement) {
    const movieId = movieElement.id.split("-")[1];
    if (movieId) {
      navigateToMovieDetail(movieId);
    }
  }
});

function navigateToMovieDetail(movieId) {
  window.location.href = `detail.html?id=${movieId}`;
  console.log(`Navigating to movie detail page for movie ID ${movieId}`);
}
