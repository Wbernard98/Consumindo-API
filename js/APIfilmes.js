const API_KEY = "91f8c8e7";
const API_URL = "https://www.omdbapi.com/"; // URL base para a OMDb API

const movieTitleInput = document.getElementById("movieTitle");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");
const errorMessageDiv = document.getElementById("errorMessage");

searchButton.addEventListener("click", () => {
  const title = movieTitleInput.value.trim();
  if (title) {
    fetchMovies(title);
  } else {
    displayError("Por favor, digite um título de filme para buscar.");
  }
});

async function fetchMovies(title) {
  resultsDiv.innerHTML = ""; // Limpa resultados anteriores
  errorMessageDiv.innerHTML = ""; // Limpa mensagens de erro anteriores

  try {
    // A chave da API agora é usada na URL da requisição
    const response = await fetch(
      `${API_URL}?s=${encodeURIComponent(title)}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      displayError(data.Error || "Nenhum filme encontrado com este título.");
    }
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    displayError(
      "Ocorreu um erro ao conectar com a API. Tente novamente mais tarde."
    );
  }
}

function displayMovies(movies) {
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/200x300?text=Sem+Poster";

    movieCard.innerHTML = `
                <img src="${poster}" alt="${movie.Title} Poster">
                <h3>${movie.Title}</h3>
                <p>Ano: ${movie.Year}</p>
            `;
    resultsDiv.appendChild(movieCard);
  });
}

function displayError(message) {
  errorMessageDiv.innerHTML = `<p>${message}</p>`;
}
