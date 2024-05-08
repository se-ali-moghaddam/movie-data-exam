const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.querySelector('main');

const getMovies = async (apiURL) => (await fetch(apiURL)).json();

window.addEventListener('load', async () => {
   showMovies(await getMovies(API_URL));
});

function showMovies(movies){
    main.innerHTML = '';

    movies.results.forEach(movie => {
        let {title, poster_path, vote_average, overview} = movie;
        let movieElement = document.createElement('div');

        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieElement);
    });
}

function getClassByRate(vote){
    if(vote >= 8)
        return 'green'
    else if(vote >= 5) 
        return 'orange'
    else
        return 'red'
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm && searchTerm !== '') {
        showMovies(await getMovies(SEARCH_API + searchTerm));
        search.value = ''
    } else {
        window.location.reload()
    }
})