import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import SearchTerm from './components/SearchTerm';
import {IMovieList, IMovie} from './Types'

function App() {

  const [movies, setMovies] = useState<IMovieList["movies"]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const url = `http://www.omdbapi.com/?apikey=6d684c9&s=${searchTerm}`

  const getMovie = async () => {
    try {
       const response = await fetch(url)
        .then(response => response.json())
        const movieResponse = response.Search as IMovieList["movies"]

        /* Iterates through the movies from the search response and
        gets their imdbID to get a response with all the properties */
        const promises = movieResponse.map(async movie => {
          const response = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=6d684c9`)
          .then(response => response.json())
          const movieRes = response as IMovie
          // Should probably move this to a utility const\function (some movies don't have a rating)
       
          if (movieRes.imdbRating.toString() === "N/A") 
            movieRes.imdbRating = 0
          if (movieRes.imdbVotes.toString() === "N/A")
            movieRes.imdbVotes = 0
          return movieRes
        })
        // Waits until all promises are done and then updates the movie state.
        const updatedMovies = await Promise.all(promises) as IMovieList["movies"]
        setMovies([...updatedMovies])
     }
     
      catch (e) {
         console.error(e as Error);
     }
     return true;
  }

  useEffect(() => {
    getMovie();
  }, [searchTerm]);

  return (
    <div className="App">
       <SearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
       <MovieList movies={movies} setMovies={setMovies} />
    </div>
  );
}

export default App;
