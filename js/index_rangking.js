const movie_key = "e771164d62de82fa2de8fde83d339c37";
const koreaMovies = Array.from(
  document.querySelectorAll("#section1 .korea > li")
);
const globalMovies = Array.from(
  document.querySelectorAll("#section2 .global > li")
);
const prevBtn = document.querySelector("#section1 .prev-btn");
const nextBtn = document.querySelector("#section1 .next-btn");
const prevBtn2 = document.querySelector("#section2 .prev-btn");
const nextBtn2 = document.querySelector("#section2 .next-btn");

let startIndex = 0; // 한국 영화의 시작 인덱스
let startIndex2 = 0; // 해외 영화의 시작 인덱스

// 영화 api 가져오기
async function fetchMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function updateMovieInfo(movie, index, type) {
  const movieElement = document.querySelectorAll(`.${type} li`)[index];
  if (movieElement) {
    const moviePoster = movieElement.querySelector(".moviePoster");
    const movieName = movieElement.querySelector(".movieName");
    const rating = movieElement.querySelector(".rating");

    if (moviePoster && movieName && rating) {
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      movieName.textContent = movie.title;
      rating.textContent = movie.vote_average.toFixed(1);
    }
  }
}

async function displayMovies(type) {
  let url;
  if (type === "korea") {
    url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${movie_key}&language=ko-KR&page=1&region=KR`;
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${movie_key}&language=en-US&page=1`;
  }

  const movies = await fetchMovies(url);
  movies.forEach((movie, index) => {
    updateMovieInfo(movie, index, type);
  });
}

// 인기차트를 표시하는 함수
function showMovies(movies, startIndex) {
  movies.forEach((movie, index) => {
    if (index >= startIndex && index < startIndex + 4) {
      movie.style.display = "block"; // 보이기
    } else {
      movie.style.display = "none"; // 숨기기
    }
  });
}

// 처음에 한국 영화와 해외 영화를 표시
displayMovies("korea");
displayMovies("global");
showMovies(koreaMovies, startIndex);
showMovies(globalMovies, startIndex2);

function nextSlide(btn, movies, startIndex) {
  btn.addEventListener("click", function () {
    startIndex += 4;
    showMovies(movies, startIndex);

    // 다시 첫 번째 영화부터 보이도록 설정
    if (startIndex >= movies.length) {
      startIndex = 0;
      showMovies(movies, startIndex);
    }
  });
}

// 이전 슬라이드로 이동하는 함수
function prevSlide(btn, movies, startIndex) {
  btn.addEventListener("click", function () {
    startIndex -= 4;
    if (startIndex < 0) {
      startIndex = 0;
    }
    showMovies(movies, startIndex);
  });
}

// 한국 영화와 해외 영화에 대한 이전과 다음 버튼에 대한 이벤트 추가
nextSlide(nextBtn, koreaMovies, startIndex);
prevSlide(prevBtn, koreaMovies, startIndex);
nextSlide(nextBtn2, globalMovies, startIndex2);
prevSlide(prevBtn2, globalMovies, startIndex2);
