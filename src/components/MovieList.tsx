import React from "react";
import { IMovieList } from "../Types";

let sorted = { Title: false, Year: false, Type: false, Metascore: false };

interface Props {
  movies: IMovieList["movies"];
  setMovies: React.Dispatch<React.SetStateAction<IMovieList["movies"]>>;
}

const MovieList: React.FC<Props> = ({ movies, setMovies }) => {
  const handleChange = (e: any) => {
    let sortedMovies;
    let type: "Title" | "Year" | "Type" | "Metascore" = e.target.id;
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
          <td>{movie.Title}</td>
          <td>{movie.Year}</td>
          <td>{movie.Type}</td>
          <td>{movie.Metascore}</td>
        </tr>
      );
    });
  };
  return (
    <div>
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
          <th id="Metascore" onClick={handleChange}>
            Metascore &#x21f5;
          </th>
        </tr>
        {renderMovieList()}
      </table>
    </div>
  );
};

export default MovieList;
