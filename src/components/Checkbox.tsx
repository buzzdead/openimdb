import React, {useState, useEffect} from 'react';
import {IMovieList} from '../Types'

const filters = ["movie", "game", "series"];

interface Props {
    movies: IMovieList["movies"];
    setFilteredMovies: React.Dispatch<React.SetStateAction<IMovieList["movies"]>>;
    favoriteMovies: IMovieList["movies"];
  }

const Checkbox: React.FC<Props> = ({movies, setFilteredMovies, favoriteMovies}) => {
    
    const [filter, setFilter] = useState(new Array(filters.length).fill(true));
    const [favoriteToggle, setFavoriteToggle] = useState(false)

    const handleOnClick = () => {
        if(!favoriteToggle)
            setFilteredMovies(favoriteMovies)
        else
            setFilteredMovies(movies)
        setFavoriteToggle(!favoriteToggle)
    }

    useEffect(() => {
        let newFilters: string[] = [];
        filters.forEach((ele, id) => {
          if (filter[id]) newFilters.push(ele);
        });
        let filtered;
        if(favoriteToggle) {
            setFilteredMovies(favoriteMovies.filter((ele) => {
                if (newFilters.includes(ele.Type)) return ele;
              }));
        }
        else {
        setFilteredMovies(movies.filter((ele) => {
          if (newFilters.includes(ele.Type)) return ele;
        }))}
    }, [movies, filter, favoriteToggle, (favoriteToggle && favoriteMovies)])

    const handleOnChange = (pos: number) => {
        const updatedCheckedState = filter.map((item, index) =>
          index === pos ? !item : item
        );
        setFilter(updatedCheckedState);
      };


    return (
        <div>
          <div className="checkbox-container">
            {filters.map((element, index) => {
              return (
                <div onClick={() => handleOnChange(index)}>
                  <input
                    value={element}
                    name={element}
                    type="checkbox"
                    checked={filter[index]}/>
                  <label htmlFor={`custom-checkbox-${index}`}>{element}</label>
                </div>
              );
            })}
          </div>
          <button style={{position: `absolute`, left: `24%`, top: `7%`}}onClick={handleOnClick}>{favoriteToggle ? `Search List` : `Favorite List`}</button>
        </div>
    )}

export default Checkbox;