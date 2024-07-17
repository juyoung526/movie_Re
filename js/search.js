// search.js
import { getApiKey } from './apiKey.js';


const API_KEY = getApiKey();
const BASE_URL = 'https://api.themoviedb.org/3';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('.searchBtn');
const clearButton = document.querySelector('.close').parentElement;
const searchResultsContainer = document.querySelector('.searchResult');
const searchTextElement = document.querySelector('.searchText');
const paginationContainer = document.querySelector('.pagination');

const RESULTS_PER_PAGE = 12;
async function searchMovies(query) {
    try {
        let allResults = [];
        let page = 1;
        let hasMorePages = true;

        while (hasMorePages) {
            const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=ko-KR`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            allResults = allResults.concat(data.results);
            hasMorePages = page < data.total_pages;
            page++;
        }

        return allResults;
    } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        return [];
    }
}

function displaySearchResults(results, query, totalFilteredResults) {
    searchTextElement.innerHTML = `
        <h4>검색어 : "${query}"</h4>
        <h5>${totalFilteredResults > 0 ? `총 ${totalFilteredResults}개가 검색되었습니다` : '검색결과가 없습니다'}</h5>
    `;

    if (results.length === 0) {
        searchResultsContainer.innerHTML = '';
        return;
    }

    const resultHTML = results.map(movie => `
        <li id="movie-${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <i class="fa-solid fa-star">${movie.vote_average.toFixed(1)}</i>
            <i class="fa-regular fa-heart zzim"></i>
        </li>
    `).join('');

    searchResultsContainer.innerHTML = `<ul class="searchSub">${resultHTML}</ul>`;

    const movieItems = searchResultsContainer.querySelectorAll('li');
    movieItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('zzim')) {
                const movieId = item.id.split('-')[1];
                window.location.href = `detail.html?id=${movieId}`;
            }
        });

        const heartIcon = item.querySelector('.zzim');
        heartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('찜하기 클릭');
            e.target.classList.toggle('fa-regular');
            e.target.classList.toggle('fa-solid');
        });
    });
}

function createPagination(currentPage, totalPages) {
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    const maxPageButtons = 5;
    let startPage = Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    let paginationHTML = `
        <button class="page-first" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-angle-double-left"></i>
        </button>
        <button class="page-prev" ${startPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-angle-left"></i>
        </button>
    `;

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<button class="page-number ${i === currentPage ? 'active' : ''}">${i}</button>`;
    }

    paginationHTML += `
        <button class="page-next" ${endPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-angle-right"></i>
        </button>
        <button class="page-last" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-angle-double-right"></i>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;

    paginationContainer.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            let newPage = currentPage;
            if (button.classList.contains('page-first')) newPage = 1;
            else if (button.classList.contains('page-prev')) newPage = Math.max(startPage - maxPageButtons, 1);
            else if (button.classList.contains('page-next')) newPage = Math.min(endPage + 1, totalPages);
            else if (button.classList.contains('page-last')) newPage = totalPages;
            else if (button.classList.contains('page-number')) newPage = parseInt(button.textContent);

            if (newPage !== currentPage) {
                performSearch(searchInput.value, newPage);
            }
        });
    });
}


async function performSearch(query, page = 1) {
    const allResults = await searchMovies(query);
    const filteredResults = allResults.filter(movie => movie.poster_path);
    const totalFilteredResults = filteredResults.length;
    const totalPages = Math.ceil(totalFilteredResults / RESULTS_PER_PAGE);

    // 요청된 페이지가 유효한 범위 내에 있는지 확인
    page = Math.max(1, Math.min(page, totalPages));

    const startIndex = (page - 1) * RESULTS_PER_PAGE;
    const pageResults = filteredResults.slice(startIndex, startIndex + RESULTS_PER_PAGE);

    displaySearchResults(pageResults, query, totalFilteredResults);
    
    if (totalFilteredResults > 0) {
        createPagination(page, totalPages);
    } else {
        paginationContainer.innerHTML = '';
    }
}
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        performSearch(query);
    }
});

clearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchTextElement.innerHTML = '';
    searchResultsContainer.innerHTML = '';
    paginationContainer.innerHTML = '';
    
    window.location.href = 'index.html';
});