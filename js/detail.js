// document.addEventListener("DOMContentLoaded", function () {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const movieId = urlParams.get("id");
//   const api_key = "3ea97978923a46de280067aadf49d8d0";

//   if (movieId) {
//     viewMovie(movieId, api_key);
//   } else {
//     console.error("영화 ID가 없습니다.");
//   }
// });

// async function viewMovie(movieId, apiKey) {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_Key}&language=ko-KR`
//     );

//     console.log('Response status:', response.status);


//     const data = await response.json();
//     console.log('Movie data:', data);
//     displayMovieDetails(data);
//   } catch (error) {
//     console.error("에러 발생:", error);
//   }
// }

// async function getMoviesByGenre(genreId) {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
//   );
//   const data = await response.json();
//   return data.results;
// }

// function displayMovieDetails(movie) {
//   const movieDetails = {
//     movieName: "title",
//     rating: "vote_average",
//     release: "release_date",
//     introduction: "overview",
//   };

//   for (const key in movieDetails) {
//     if (movieDetails.hasOwnProperty(key)) {
//       const element = movieDetails[key];
//       const spanElement = document.getElementById(key);
//       if (movie[element]) {
//         spanElement.textContent = movie[element];
//       } else {
//         spanElement.textContent = "정보 없음";
//       }
//     }
//   }

//   const poster = document.getElementById("poster");
//   poster.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500/${movie.poster_path}")`;
// }


// const api_key = "e771164d62de82fa2de8fde83d339c37";

// async function getMoviesByGenre() {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=ko-KR`
//   );
//   const data = await response.json();
//   // return data.results;
//   console.log(data);
// }
// getMoviesByGenre(28);
const api_key = "e771164d62de82fa2de8fde83d339c37";

async function getPopularMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=ko-KR`
  );
  if (!response.ok) {
    throw new Error(`HTTP 오류! 상태: ${response.status}`);
  }
  const data = await response.json();
  console.log(data.results);
  return data.results;
}

// 인기 있는 영화 목록을 가져오기
getPopularMovies()
  .then(results => {
    console.log(results); // 여기서 결과를 처리합니다
  })
  .catch(error => {
    console.error('영화 가져오기 오류:', error);
  });

function displayMovieDetails(movie) {
  const movieDetails = {
    movieName: "title",
    rating: "vote_average",
    release: "release_date",
    introduction: "overview",
  };
}

