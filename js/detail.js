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
// getMoviesByGenre(28);import { getApiKey } from "./apiKey.js";
import { getApiKey } from "./apiKey.js";
const API_KEY = getApiKey();

async function getMovieDetails(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR&append_to_response=credits,videos`
  );
  if (!response.ok) {
    throw new Error(`HTTP 오류! 상태: ${response.status}`);
  }
  return await response.json();
}

function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function updateMovieDetails(movie) {
  document.getElementById("movieTitle").textContent = movie.title;

  const rating = movie.vote_average;
  document.getElementById("movieRating").textContent = `${rating.toFixed(1)}`;

  // 별점 시각화
  const starPercentage = (rating / 10) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  document.querySelector(".stars-inner").style.width = starPercentageRounded;

  document.getElementById("movieDirector").textContent = `감독: ${getDirectorNames(movie.credits.crew)}`;

  document.getElementById("movieOverview").textContent = movie.overview;

  updatePosterAndTrailers(movie);
  updateCastImages(movie.credits.cast);
}

function getDirectorNames(crew) {
  const directors = crew.filter(person => person.job === 'Director');
  return directors.map(director => director.name).join(', ');
}

function getCastNames(cast) {
  return cast.slice(0, 3).map(actor => actor.name).join(', ');
}

function updateCastImages(cast) {
  const castMembers = document.querySelectorAll('.cast-member');
  const defaultAvatarUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

  cast.slice(0, 3).forEach((actor, index) => {
    const img = castMembers[index].querySelector('.cast-image');
    const name = castMembers[index].querySelector('.cast-name');
    if (actor.profile_path) {
      img.src = `https://image.tmdb.org/t/p/w200${actor.profile_path}`;
    } else {
      img.src = defaultAvatarUrl;
    }
    img.alt = actor.name;
    name.textContent = actor.name;
  });
}
function updatePosterAndTrailers(movie) {
  const posterPath = movie.poster_path;
  const posterImg = document.getElementById("posterImage");
  if (posterPath) {
    posterImg.src = `https://image.tmdb.org/t/p/original${posterPath}`;
    posterImg.alt = `${movie.title} 포스터`;
  } else {
    posterImg.src = 'placeholder.jpg';
    posterImg.alt = '포스터 없음';
  }

  const videos = movie.videos.results.filter(video => video.site === "YouTube");
  const trailers = videos.filter(video => video.type === "Trailer");
  const otherVideos = videos.filter(video => video.type !== "Trailer");

  // 메인 트레일러 처리
  const mainTrailerContainer = document.getElementById('mainTrailer');
  if (trailers.length > 0) {
    mainTrailerContainer.innerHTML = `
            <iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/${trailers[0].key}?autoplay=1&mute=1" 
                frameborder="0" allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>
        `;
  } else {
    mainTrailerContainer.style.display = 'none';
  }

  // 추가 비디오 처리
  const trailerSection = document.getElementById('trailerSection');
  const additionalVideos = [...trailers.slice(1), ...otherVideos].slice(0, 2); // 최대 2개의 추가 비디오

  if (additionalVideos.length > 0) {
    trailerSection.style.display = 'block';
    additionalVideos.forEach((video, index) => {
      document.getElementById(`additionalTrailer${index + 1}`).innerHTML = `
                <iframe width="100%" height="100%" 
                    src="https://www.youtube.com/embed/${video.key}" 
                    frameborder="0" allow="encrypted-media" 
                    allowfullscreen>
                </iframe>
            `;
    });
  } else {
    trailerSection.style.display = 'none';
  }
}

async function displayMovieDetails() {
  try {
    const movieId = getMovieIdFromUrl();
    if (!movieId) {
      throw new Error("영화 ID를 찾을 수 없습니다.");
    }
    const movie = await getMovieDetails(movieId);
    updateMovieDetails(movie);
  } catch (error) {
    console.error("영화 정보 가져오기 오류:", error);
  }
}

document.addEventListener("DOMContentLoaded", displayMovieDetails);