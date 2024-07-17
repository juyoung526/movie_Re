

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

