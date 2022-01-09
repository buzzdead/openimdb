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
                <br></br>
                 {movieModal.Title}
                 <br></br>
                 <a>Made in:&nbsp;</a>
              {movieModal.Year}
              <br></br>
              <br></br>
              <a>Starring:</a>
              <br></br>
              {movieModal.Actors}
              <br></br>
              <br></br>
              {movieModal.Director !== "N/A" && <div><a>Director: </a> <br></br></div>}
              {movieModal.Director !== "N/A" && movieModal.Director}
              <br></br>
              <br></br>
              <div className="plot">{movieModal.Plot}</div>
                </div>
            </h1>)}
            </div>
    )
                }

export default Modal;