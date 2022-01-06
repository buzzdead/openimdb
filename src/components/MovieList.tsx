import React, { useState } from "react";
import { IMovieList, IMovieModal } from "../Types";

let sorted = { Title: false, Year: false, Type: false, imdbRating: false };
const filters = ["movie", "game", "series"]

interface Props {
  movies: IMovieList["movies"];
  setMovies: React.Dispatch<React.SetStateAction<IMovieList["movies"]>>;
}

const MovieList: React.FC<Props> = ({ movies, setMovies }) => {

const handleMouseOver = (e: any) => {
  setMovieModal(e as IMovieModal)
}

const [movieModal, setMovieModal] = useState<IMovieModal>();
const [filter, setFilter] = useState(
  new Array(filters.length).fill(true)
);

  const onClick = (e: any) => {
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

  const handleOnChange = (pos: number) => {
    const updatedCheckedState = filter.map((item, index) =>
      index === pos ? !item : item
    );
    setFilter(updatedCheckedState);
   }

  const renderMovieList = (): JSX.Element[] => {
    let newFilters: string[] = []
    filters.forEach((ele, id) => {
      if (filter[id]) newFilters.push(ele)
    })
    const filtered = movies.filter((ele) => {
      if(newFilters.includes(ele.Type))
        return ele
    })
    return filtered.map((movie, key) => {
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
          <td onMouseLeave={() => handleMouseOver(undefined)} onMouseEnter={() => handleMouseOver(movie)}>{movie.Title}</td>
          <td>{movie.Year}</td>
          <td>{movie.Type}</td>
          <td><span id="rating">{movie.imdbRating}/10</span> &nbsp;&nbsp;<span>from {movie.imdbVotes} users</span></td>
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
              <input value={element} name={element} type="checkbox" checked={filter[index]} onChange={() => handleOnChange(index)} />
              <label htmlFor={`custom-checkbox-${index}`}>{element}</label>
           </div>
         )})}
       </div>
      <table>
        <tr>
          <th></th>
          <th id="Title" onClick={onClick}>
            Title &#x21f5;
          </th>
          <th id="Year" onClick={onClick}>
            Year &#x21f5;
          </th>
          <th id="Type" onClick={onClick}>
            Type &#x21f5;
          </th>
          <th id="imdbRating" onClick={onClick}>
            Rating &#x21f5;
          </th>
        </tr>
        {renderMovieList()}
      </table>
      {movieModal && <h1 className="modal">{movieModal.Title}</h1>}
    </div>
  );
};

export default MovieList;
