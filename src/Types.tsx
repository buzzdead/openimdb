export interface IMovie {
    Title: string
    Metascore: number
    Year: number
    Poster: string
    Type: string
    imdbID: string
    imdbRating: number
    imdbVotes: number
    Actors: string
    Director: string
    Plot: string
    
}

export interface IMovieModalList {
  modal: {
  Title: string
  Metascore: number
  Year: number
  Poster: string
  Type: string
  imdbID: string
  imdbRating: number
  Actors: string
  Director: string
  Plot: string
  }[]
}

export interface IMovieModal {
  Title: string
  Metascore: number
  Year: number
  Poster: string
  Type: string
  imdbID: string
  posX: number
  posY: number
  Actors: string
  Director: string
  Plot: string
  
}

export interface IMovieList {
  movies: {
  Title: string
  Metascore: number
  Year: number
  Poster: string
  Type: string
  imdbID: string
  imdbRating: number
  imdbVotes: number
  Actors: string
  Director: string
  Plot: string
  }[]
}