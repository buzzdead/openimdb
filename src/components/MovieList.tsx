import React, { useState } from "react";
import { IMovieList, IMovieModal } from "../Types";

let sorted = { Title: false, Year: true, Type: false, imdbRating: true };
const filters = ["movie", "game", "series"];

interface Props {
  movies: IMovieList["movies"];
  setMovies: React.Dispatch<React.SetStateAction<IMovieList["movies"]>>;
}

const MovieList: React.FC<Props> = ({ movies, setMovies }) => {
  const [movieModal, setMovieModal] = useState<IMovieModal>();
  const [filter, setFilter] = useState(new Array(filters.length).fill(true));

  const handleMouseOver = (e: IMovieModal | undefined) => {
    setMovieModal(e);
  };

  const handleOnClick = (e: any) => {
    let sortedMovies;
    let type: "Title" | "Year" | "Type" | "imdbRating" = e.target.id;
      sortedMovies = movies.sort((a, b) => {
        if (sorted[type] && a[type] > b[type] || !sorted[type] && a[type] < b[type]) {
          return -1;
        }
        if (sorted[type] && a[type] < b[type] || !sorted[type] && a[type] > b[type]){
          return 1;
        }
        return 0;

      })
      sorted[type] = !sorted[type];
      setMovies([...sortedMovies]);
  };

  const handleOnChange = (pos: number) => {
    const updatedCheckedState = filter.map((item, index) =>
      index === pos ? !item : item
    );
    setFilter(updatedCheckedState);
  };

  const renderMovieList = (): JSX.Element[] => {

    // Haven't refactored it, but basically filters out movies into a new array before rendering the table.
    let newFilters: string[] = [];
    filters.forEach((ele, id) => {
      if (filter[id]) newFilters.push(ele);
    });
    const filtered = movies.filter((ele) => {
      if (newFilters.includes(ele.Type)) return ele;
    });
    return filtered.map((movie, key) => {
      return (
        <tr key={key}>
          <a href={`https://www.imdb.com/title/${movie.imdbID}/?ref_=fn_al_tt_1`} target="_blank">
          <img
            className="poster"
            src={
              movie.Poster
                ? movie.Poster
                : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-696x1024.jpg"
            }
            alt=""
          ></img>
          </a>
          <td
            onMouseLeave={() => handleMouseOver(undefined)}
            onMouseEnter={() => handleMouseOver(movie as unknown as IMovieModal)}
          >
            {movie.Title}
          </td>
          <td>{movie.Year}</td>
          <td>{movie.Type}</td>
          <td>
            <span id="rating">{movie.imdbRating}/10</span> &nbsp;&nbsp;
            <span>from {movie.imdbVotes} users</span>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="checkbox-container">
        {filters.map((element, index) => {
          return (
            <div>
              <input
                value={element}
                name={element}
                type="checkbox"
                checked={filter[index]}
                onChange={() => handleOnChange(index)}
              />
              <label htmlFor={`custom-checkbox-${index}`}>{element}</label>
            </div>
          );
        })}
      </div>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th id="Title" onClick={handleOnClick}>
            Title &#x21f5;
          </th>
          <th id="Year" onClick={handleOnClick}>
            Year &#x21f5;
          </th>
          <th id="Type" onClick={handleOnClick}>
            Type &#x21f5;
          </th>
          <th id="imdbRating" onClick={handleOnClick}>
            Rating &#x21f5;
          </th>
        </tr>
        {renderMovieList()}
        </tbody>
      </table>
      {movieModal && <h1 className="modal">{movieModal.Title}</h1>}
    </div>
  );
};

export default MovieList;
