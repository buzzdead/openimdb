import React from 'react';
import { IMovieList } from "../../Types";

let sorted = { Title: false, Year: true, Type: false, imdbRating: true };
interface Props {
    filteredMovies: IMovieList["movies"];
    setFilteredMovies: React.Dispatch<React.SetStateAction<IMovieList["movies"]>>;
  }
const Table: React.FC<Props> = ({ filteredMovies, setFilteredMovies }) => {

    const handleOnClick = (e: any) => {
        let sortedMovies;
        let type: "Title" | "Year" | "Type" | "imdbRating" = e.target.id;
        sortedMovies = filteredMovies.sort((a, b) => {
          if (
            (sorted[type] && a[type] > b[type]) ||
            (!sorted[type] && a[type] < b[type])
          ) {
            return -1;
          }
          if (
            (sorted[type] && a[type] < b[type]) ||
            (!sorted[type] && a[type] > b[type])
          ) {
            return 1;
          }
          return 0;
        });
        sorted[type] = !sorted[type];
        setFilteredMovies([...sortedMovies]);
      };
    
    return (
        <tbody>
          <tr>
            <th></th>
            <th className="table-header" id="Title" onClick={handleOnClick}>
              Title &#x21f5;
            </th>
            <th className="table-header" id="Year" onClick={handleOnClick}>
              Year &#x21f5;
            </th>
            <th className="table-header" id="Type" onClick={handleOnClick}>
              Type &#x21f5;
            </th>
            <th
              className="table-header"
              id="imdbRating"
              onClick={handleOnClick}
            >
              Rating &#x21f5;
            </th>
          </tr>
        </tbody>
      )
}

export default Table;