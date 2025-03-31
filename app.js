const apikey = "410f0c52";

const fetchmovie = async (title) => {
    console.log(title);
    const resp = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apikey}`);
    const data = await resp.json();
    console.log(data);
    return data;
};

const searchbttitle = async () => {
    const title = document.querySelector("#moviesearch").value.trim();
    if (!title) {
        alert("Please enter a movie title");
        return;
    }
    displayMovies(await fetchmovie(title));
};

function displayMovies(data) {
    console.log(data);
    const movieResult = document.querySelector("#movieResult");
    movieResult.innerHTML = "";

    movieResult.style.display = "flex";
    movieResult.style.flexWrap = "wrap";
    movieResult.style.justifyContent = "center"; 
    movieResult.style.gap = "20px"; 

    if (data.Response === "False") {
        movieResult.innerHTML = `<div class='alert alert-danger'>No movies Found</div>`;
        return;
    }

    data.Search.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-card"); 

      
        movieDiv.style.display = "flex";
        movieDiv.style.flexDirection = "column";
        movieDiv.style.alignItems = "center";
        movieDiv.style.justifyContent = "space-between";
        movieDiv.style.border = "2px solid black";
        movieDiv.style.padding = "10px";
        movieDiv.style.backgroundColor = "#fff";
        movieDiv.style.width = "200px";
        movieDiv.style.textAlign = "center";

        movieDiv.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" style="width: 100%; height: 250px; object-fit: cover;">
            <h3 style="font-size: 16px; margin-top: 10px;">${movie.Title}</h3>
            <p style="font-size: 14px;">${movie.Year}</p>
        `;

        movieResult.appendChild(movieDiv);
    });
}
