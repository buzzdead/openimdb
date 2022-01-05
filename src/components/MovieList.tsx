import React, { useState } from "react";
import { IMovieList, IMovieModal } from "../Types";

let sorted = { Title: false, Year: false, Type: false, imdbRating: false };

interface Props {
  movies: IMovieList["movies"];
  setMovies: React.Dispatch<React.SetStateAction<IMovieList["movies"]>>;
}

const MovieList: React.FC<Props> = ({ movies, setMovies }) => {

const handleClick = (e: any) => {
  setMovieModal(e as IMovieModal)
}

const [movieModal, setMovieModal] = useState<IMovieModal>();

  const handleChange = (e: any) => {
    let sortedMovies;
    let type: "Title" | "Year" | "Type" | "imdbRating" = e.target.id;
    if (sorted[type]) {
      sortedMovies = movies.sort((a, b) => {
        if (a[type] > b[type]) {
          return -1;
        }
        if (a[type] < b[type]) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedMovies = movies.sort(function (a, b) {
        if (a[type] < b[type]) {
          return -1;
        }
        if (a[type] > b[type]) {
          return 1;
        }
        return 0;
      });
    }
    sorted[type] = !sorted[type];
    setMovies([...sortedMovies]);
  };

  const renderMovieList = (): JSX.Element[] => {
    return movies.map((movie, key) => {
      return (
        <tr key={key}>
          <img
            className="poster"
            src={
              movie.Poster
                ? movie.Poster
                : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-696x1024.jpg"
            }
            alt=""
          ></img>
          <td onMouseLeave={() => handleClick(undefined)} onMouseEnter={() => handleClick(movie)}>{movie.Title}</td>
          <td>{movie.Year}</td>
          <td>{movie.Type}</td>
          <td>{movie.imdbRating}/10 &nbsp;&nbsp;<span>from {movie.imdbVotes} users</span></td>
        </tr>
      );
    });
  };
  return (
    <div>
      {!movieModal && <h1 className="modal">Modal</h1>}
      {movieModal && <h1 className="modal">{movieModal.Title}</h1>}
      <table>
        <tr>
          <th></th>
          <th id="Title" onClick={handleChange}>
            Title &#x21f5;
          </th>
          <th id="Year" onClick={handleChange}>
            Year &#x21f5;
          </th>
          <th id="Type" onClick={handleChange}>
            Type &#x21f5;
          </th>
          <th id="imdbRating" onClick={handleChange}>
            imdbRating &#x21f5;
          </th>
        </tr>
        {renderMovieList()}
      </table>
    </div>
  );
};

export default MovieList;
