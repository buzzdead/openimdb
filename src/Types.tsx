export interface IMovie {
    Title: string
    Metascore: number
    Year: number
    Poster: string
    Type: string
    imdbID: string
    imdbRating: number
    imdbVotes: number
    
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
  }[]
}