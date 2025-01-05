console.log("----- News App -----");

const apiKey = "66b0ea02e0394bec9136d7766a6fc09b";
const apiURL = "https://newsapi.org/v2/everything?";
const newsContainer = document.getElementById("container");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Function to fetch news
async function fetchNews(query = "top-headlines") {
  try {
    const url = `${apiURL}q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key");
      } else if (response.status === 404) {
        throw new Error("API URL not found");
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log(data);
    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = ""; // clears previous news, start with clean slate

  if (articles.length === 0) {
    newsContainer.innerHTML = "<p>OOOPPS.. NO NEWS FOUND</p>";
    return;
  }

  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article");

    const title = document.createElement("h3");
    title.textContent = article.title || "Title is missing";

    const description = document.createElement("p");
    description.textContent = article.description || "Description is missing";

    const author = document.createElement("p");
    author.textContent = article.author || "Author not available";

    const published = document.createElement("p");
    published.textContent =
      article.publishedAt || "Publication date not available";

    const image = document.createElement("img");
    image.src = article.urlToImage || "https://via.placeholder.com/273x182";

    const readMore = document.createElement("a");
    readMore.href = article.url;
    readMore.target = "_blank";
    readMore.textContent = "Read More";

    newsContainer.appendChild(articleElement);

    articleElement.appendChild(title);
    articleElement.appendChild(description);
    articleElement.appendChild(author);
    articleElement.appendChild(published);
    articleElement.appendChild(image);
    articleElement.appendChild(readMore);
  });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  } else {
    alert("Search bar cannot be empty");
  }
});

const categoryBtn = document.querySelectorAll(".category-button");
categoryBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    const category = event.target.getAttribute("data-category");
    fetchNews(category);
  });
});

fetchNews();
