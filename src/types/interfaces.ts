export interface BaseMovieProps {
  title?: string;
  name?: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
}

// export interface BaseMovieListProps {
//   movies: BaseMovieProps[];
//   action: (m: BaseMovieProps) => React.ReactNode;
// }

// Generic Interface
export interface BaseMovieListProps<T extends BaseMovieProps> {
  movies: T[];
  action: (m: T) => React.ReactNode;
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export type FilterOption = "title" | "genre";

// export interface MovieListPageTemplateProps extends BaseMovieListProps {
//   title: string;
// }

// Generic Interface
export interface MovieListPageTemplateProps<T extends BaseMovieProps> extends BaseMovieListProps<T> {
  title: string;
}

export interface GenreData {
  genres: {
    id: string;
    name: string;
  }[];
}

export interface DiscoverMovies {
  page: number;
  total_pages: number;
  tota_results: number;
  results: BaseMovieProps[];
}

export interface Review {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  movieId: number,
  _id: string,
  type: string;
}

export interface UpcomingMovies {
  page: number;
  total_pages: number;
  tota_results: number;
  results: BaseMovieProps[];
}

export interface TVDetailsProps {
  id: number;
  name: string;
  overview: string;
  genres: { id: number; name: string }[];
  episode_run_time: number[];
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  in_production: boolean;
  type: string;
  homepage: string | undefined;
  tagline: string;

}

export interface MyFantasyMovieProps {
  _id: string;
  title: string;
  genres: number[];
  directors: string[];
  plot: string;
  cast: { realName: string; fictionName: string }[];
  imagefile?: FileList;
  image_path?: string;

}




