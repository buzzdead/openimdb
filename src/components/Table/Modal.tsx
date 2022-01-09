import React, { useEffect } from 'react'
import {IMovieModal} from '../../Types' 

interface Props {
    movieModal: IMovieModal | undefined
    modalPos: {x: number, y:number}
    setModalPos: React.Dispatch<React.SetStateAction<{x: number, y:number}>>
  }

const Modal: React.FC<Props> = ({movieModal, modalPos, setModalPos}) => {
    
  useEffect(() => {
    const setPos = (event: MouseEvent) =>
      setModalPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", setPos);
    return(() => {
      window.removeEventListener("mousemove", setPos)
    }
    )})

    return (
        <div>
        {movieModal && (
            <h1
              style={{
                top: `${modalPos.y - modalPos.y / 2}px`,
                left: `${modalPos.x + modalPos.x / 2}px`,
              }}
              className="modal"
            >
              <img
                  className="modal-poster"
                  src={
                    movieModal.Poster
                      ? movieModal.Poster
                      : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-696x1024.jpg"
                  }
                  alt=""
                ></img>
                <div className="modal-stuff">
                 <p><span className="movie-info" id="title">{movieModal.Title}</span></p>
                 <p><span>Made in: </span><span className="movie-info">{movieModal.Year}</span></p>
              <p><span>Starring: </span> <span className="movie-info"> {movieModal.Actors}</span></p>
              {movieModal.Director !== "N/A" &&<p> <span>Director: </span><span className="movie-info">{movieModal.Director}</span></p>}
              <p><span className="movie-info">{movieModal.Plot}</span></p>
                </div>
            </h1>)}
            </div>
    )
                }

export default Modal;