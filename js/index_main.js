

import { getApiKey } from './apiKey.js';
const api_key = getApiKey();


async function getMovies() {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    const data = await response.json();
    return data.results;
}

async function mainMovies() {
    const movies = await getMovies();

    const mainScreen = document.querySelector("#mainScreen");

    let result1 = "";

    movies.slice(0, 4).forEach((movie) => {
        const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        result1 += `
        <li>
            <img src="${imgUrl}" alt="bigMainPoster">
                <div>
                    <img class="centerImg"  src="${imgUrl}" alt="mainmovePoster">
                    <h3 class="centerText">${movie.title}</h3>
                </div>
        </li>
                `;
    })
    mainScreen.innerHTML = result1;
}
mainMovies();

// 영화 항목 클릭 이벤트 처리
document.addEventListener('click', function (event) {
    const movieElement = event.target.closest('[id^="movie-"]');
    if (movieElement) {
        const movieId = movieElement.id.split('-')[1];
        navigateToMovieDetail(movieId);
    }
});

// 영화 상세 페이지로 이동하는 함수
function navigateToMovieDetail(movieId) {
    window.location.href = `detail.html?id=${movieId}`;
    console.log(`Navigating to movie detail page for movie ID ${movieId}`);
}
