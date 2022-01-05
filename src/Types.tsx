export interface IMovie {
    Title: string
    Metascore: number
    Year: number
    Poster: string
    Type: string
    imdbID: string
    
}

export interface IMovieList {
  movies: {
  Title: string
  Metascore: number
  Year: number
  Poster: string
  Type: string
  imdbID: string
  }[]
}