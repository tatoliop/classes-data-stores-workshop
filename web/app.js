// Function to fetch movies based on movie ID (or all movies if no ID)
function fetchMovies() {
    const movieDetails = document.getElementById('movieDetails');

    // Clear previous details
    movieDetails.innerHTML = '';

    // Define the API URL
    let url = 'http://127.0.0.1:8080/movie/get/';

    // Call Flask API to fetch movie(s)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length === 0) {
                movieDetails.innerHTML = 'No movies found.';
            } else if (Array.isArray(data)) {
                // Display all movies
                data.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.innerHTML = `
                        <h3>${movie.title} (${movie.year})</h3>
                        <p>Rating: ${movie.score}</p>
                    `;
                    movieDetails.appendChild(movieElement);
                });
            } else {
                // Display single movie
                movieDetails.innerHTML = `
                    <h3>${data.title} (${data.year})</h3>
                    <p>Rating: ${data.score}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching movie:', error);
            movieDetails.innerHTML = 'Error fetching movie data.';
        });
}

// Function to handle the form submission and add a new movie
document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const score = document.getElementById('score').value;

    // Create movie data object
    const movieData = {
        title: title,
        year: parseInt(year),
        score: parseFloat(score)
    };

    // Call Flask API to add the movie to the database
    fetch('http://127.0.0.1:8080/movie/put/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(movieData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.Message === 'OK') {
            alert('Movie added successfully!');
            // Clear the form
            document.getElementById('movieForm').reset();
        } else {
            alert('Error adding movie');
        }
    })
    .catch(error => {
        console.error('Error adding movie:', error);
        alert('Error adding movie');
    });
});
