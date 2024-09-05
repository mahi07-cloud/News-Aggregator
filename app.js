const apiKey = '169b4c59e09d4fff84ad2c6f63b44e09';  // Replace with your actual API key
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
let currentPage = 1;  // Start on page 1

// Function to fetch news
async function fetchNews(page = 1) {
    const response = await fetch(`${apiUrl}&page=${page}`);
    const data = await response.json();
    displayNews(data.articles);
}

// Function to display news on the webpage
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsCard = `
        <div class="col-md-4">
            <div class="card">
                <img src="${article.urlToImage}" class="card-img-top" alt="news image">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                </div>
            </div>
        </div>
        `;
        newsContainer.innerHTML += newsCard;
    });
}

// Search function
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value;
    searchNews(searchTerm);
});

// Function to search news by keyword
async function searchNews(keyword) {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`);
    const data = await response.json();
    displayNews(data.articles);
}

// Pagination functions
document.getElementById('next-btn').addEventListener('click', () => {
    currentPage++;
    fetchNews(currentPage);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchNews(currentPage);
    }
});

// Initial news fetch
document.addEventListener('DOMContentLoaded', () => fetchNews());
