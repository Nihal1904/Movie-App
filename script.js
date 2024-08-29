document.addEventListener("DOMContentLoaded", () => {
  const fetchMovieButton = document.getElementById("fetch-movie");
  const movieTitleInput = document.getElementById("movie-title");
  const movieInfoDiv = document.getElementById("movie-info");
  const loadingSpinner = document.getElementById("loading-spinner");

  fetchMovieButton.addEventListener("click", () => {
    const movieTitle = movieTitleInput.value.trim();
    if (movieTitle) {
      fetchMovieData(movieTitle);
    } else {
      alert("Please enter a movie title");
    }
  });

  function fetchMovieData(title) {
    const apiKey = "71e4deff";
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(
      title
    )}&apikey=${apiKey}`;

    loadingSpinner.classList.remove("hidden");
    movieInfoDiv.innerHTML = "";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        loadingSpinner.classList.add("hidden");
        if (data.Response === "True") {
          displayMovieData(data);
        } else {
          movieInfoDiv.innerHTML = '<p id="error-message">Movie not found</p>';
        }
      })
      .catch((error) => {
        loadingSpinner.classList.add("hidden");
        console.error("Error fetching movie data:", error);
        movieInfoDiv.innerHTML =
          '<p id="error-message">Error fetching movie data</p>';
      });
  }

  function displayMovieData(movie) {
    movieInfoDiv.innerHTML = `
            <div class="movie-title">${movie.Title} (${movie.Year})</div>
            <div class="movie-details">Director: ${movie.Director}</div>
            <div class="movie-details">Genre: ${movie.Genre}</div>
            <div class="movie-details">Rating: ${movie.imdbRating}</div>
            <div class="movie-details">Runtime: ${movie.Runtime}</div>
            <div class="movie-details">Actors: ${movie.Actors}</div>
            <div class="movie-details">Plot: ${movie.Plot}</div>
            <div class="movie-details">
                <img src="${movie.Poster}" alt="${movie.Title} poster" style="width: 100px;">
            </div>
        `;
  }
});
