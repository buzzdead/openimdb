import React, { useState, useEffect, Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import SearchTerm from "./components/SearchTerm";
import { IMovieList, IMovie } from "./Types";

function App() {
  const [movies, setMovies] = useState<IMovieList["movies"]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const url = `http://www.omdbapi.com/?apikey=6d684c9&s=${searchTerm}`;

  const getMovie = async () => {
    try {
      const response = await fetch(url).then((response) => response.json());
      const movieResponse = response.Search as IMovieList["movies"];

      const promises = movieResponse.map(async (movie) => {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=6d684c9`
        ).then((response) => response.json());
        const movieRes = response as IMovie;
        if (movieRes.Metascore.toString() == "N/A") movieRes.Metascore = 0;
        return movieRes;
      });
      const updatedMovies = (await Promise.all(
        promises
      )) as IMovieList["movies"];
      setMovies([...updatedMovies]);
    } catch (e) {
      console.error(e as Error);
    }
    return true;
  };

  useEffect(() => {
    getMovie();
  }, [searchTerm]);

  return (
    <div className="App">
      <MovieList movies={movies} setMovies={setMovies} />
      <SearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
}

export default App;
