import React, { useState } from "react";
import { IMovieList, IMovieModal, IMovie } from "../../Types";
import Filter from "../Filter";
import Modal from "./Modal";
import Table from "./Table";

const filters = ["movie", "game", "series"];

interface Props {
  movies: IMovieList["movies"];
  setMovies: React.Dispatch<React.SetStateAction<IMovieList["movies"]>>;
}

const MovieList: React.FC<Props> = ({ movies, setMovies }) => {
  const [movieModal, setMovieModal] = useState<IMovieModal>();
  const [filteredMovies, setFilteredMovies] = useState<IMovieList["movies"]>(
    []
  );
  const [favoriteMovies, setFavoriteMovies] = useState<IMovieList["movies"]>(
    []
  );
  const [modalPos, setModalPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseOver = (e: IMovieModal | undefined) => {
    setMovieModal(e);
  };

  const handleOnClick = (movie: IMovie) => {
    if (favoriteMovies.includes(movie)) {
      handleMouseOver(undefined)
      setFavoriteMovies([
        ...favoriteMovies.filter((ele) => {
          if (ele !== movie) return ele;
        }),
      ]);
    }
    else
    setFavoriteMovies([...favoriteMovies, movie]);
  };

  const renderMovieList = (): JSX.Element[] => {
    return filteredMovies.map((movie, key) => {
      return (
        <tr key={key}>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}/?ref_=fn_al_tt_1`}
            target="_blank"
          >
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
            style= {{cursor: `copy`}}
            onClick={() => handleOnClick(movie)}
            onMouseLeave={() => handleMouseOver(undefined)}
            onMouseEnter={() =>
              handleMouseOver(movie as unknown as IMovieModal)
            }
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
      <Filter
        movies={movies}
        setFilteredMovies={setFilteredMovies}
        favoriteMovies={favoriteMovies}
      />
      <table>
        <Table
          filteredMovies={filteredMovies}
          setFilteredMovies={setFilteredMovies}
        />
        {renderMovieList()}
      </table>
      <Modal
        movieModal={movieModal}
        modalPos={modalPos}
        setModalPos={setModalPos}
      />
    </div>
  );
};

export default MovieList;
