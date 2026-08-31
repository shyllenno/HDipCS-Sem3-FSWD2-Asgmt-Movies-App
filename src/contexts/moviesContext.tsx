import React, { useState, useCallback } from "react";
import { BaseMovieProps, MyFantasyMovieProps, Review } from "../types/interfaces";
import { getMoviesGenres } from "../api/tmdb-api.ts";

interface FavouriteItem {
  id: number;
  type: "movie" | "tv";
}

interface MovieContextInterface {
  favourites: FavouriteItem[];
  addToFavourites: ((movie: BaseMovieProps) => void);
  removeFromFavourites: ((movie: BaseMovieProps) => void);
  addReview: ((movie: BaseMovieProps, review: Review) => void);

  mustWatch: number[];
  addToMustWatch: ((movie: BaseMovieProps) => void);
  removeFromMustWatch: ((movie: BaseMovieProps) => void);

  myReviews: Review[];

  genresList: { id: number; name: string }[];
  genreMap: Record<number, string>;

  myFantasyMovies: MyFantasyMovieProps[];
  addFantasyMovie: ((formData: FormData) => Promise<void>);
  getFantasyMovieById: ((id: string) => Promise<MyFantasyMovieProps>);
  deleteFantasyMovie: ((id: string) => Promise<void>);
}
const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => { },
  removeFromFavourites: () => { },
  addReview: (movie, review) => { movie.id, review },

  mustWatch: [],
  addToMustWatch: () => { },
  removeFromMustWatch: () => { },

  myReviews: [],

  genresList: [],
  genreMap: {},

  myFantasyMovies: [],
  addFantasyMovie: async () => { },
  getFantasyMovieById: async (id: string) => { return {} as MyFantasyMovieProps; },
  deleteFantasyMovie: async () => { },
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [myFantasyMovies, setMyFantasyMovies] = useState<MyFantasyMovieProps[]>([]);


  React.useEffect(() => {
    fetch(`https://fswd2-asgmt-movies-app-backend.onrender.com/getfavourites`)
      .then((res) => res.json())
      .then(
        (data: { movieId: number; type: "movie" | "tv" }[]) =>
          setFavourites(
            data.map((f) => ({
              id: f.movieId,
              type: f.type,
            }))
          )
      );
  }, []);

  const addToFavourites = useCallback(async (movie: BaseMovieProps) => {
    const type: "movie" | "tv" = movie.title ? "movie" : "tv";

    await fetch("https://fswd2-asgmt-movies-app-backend.onrender.com/addtofavourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: movie.id, type }),
    });

    setFavourites((prev) => [...prev, { id: movie.id, type }]);
  }, []);

  const removeFromFavourites = useCallback(async (movie: BaseMovieProps) => {
    await fetch(`https://fswd2-asgmt-movies-app-backend.onrender.com/removefromfavourites/${movie.id}`, {
      method: "DELETE",
    });

    setFavourites((prev) => prev.filter((f) => f.id !== movie.id));
  }, []);

  const addReview = async (movie: BaseMovieProps, review: Review) => {
    const type: "movie" | "tv" = movie.title ? "movie" : "tv";
    review.type = type;

    await fetch("https://fswd2-asgmt-movies-app-backend.onrender.com/addreview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    setMyReviews(prev => [...prev, review]);
  };

  const [mustWatch, setMustWatch] = useState<number[]>([]);

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch(prev => {
      if (!prev.includes(movie.id)) {
        const updated = [...prev, movie.id];
        console.log("Must Watch:", updated);
        return updated;
      }
      return prev;
    });
  }, []);

  const removeFromMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch(prev => prev.filter(id => id !== movie.id));
  }, []);

  const [genresList, setGenresList] = useState<{ id: number; name: string }[]>([]);

  React.useEffect(() => {
    getMoviesGenres()
      .then((data) => {
        setGenresList(data.genres);
      })
      .catch((err) => console.error(err));
  }, []);

  const genreMap = React.useMemo(() => {
    const map: Record<number, string> = {};
    genresList.forEach((g) => {
      map[g.id] = g.name;
    });
    return map;
  }, [genresList]);


  const addFantasyMovie = useCallback(async (formData: FormData) => {
    const res = await fetch("https://fswd2-asgmt-movies-app-backend.onrender.com/addfantasymovie", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to add fantasy movie");
    }

    const updatedListRes = await fetch("https://fswd2-asgmt-movies-app-backend.onrender.com/getfantasymovies");
    const updatedList = await updatedListRes.json();

    setMyFantasyMovies(updatedList);
  }, []);


  React.useEffect(() => {
    fetch(`https://fswd2-asgmt-movies-app-backend.onrender.com/getfantasymovies`)
      .then((res) => res.json())
      .then((data: MyFantasyMovieProps[]) => {
        setMyFantasyMovies(data);
      })
  }, []);

  const getFantasyMovieById = useCallback(async (id: string): Promise<MyFantasyMovieProps> => {
    const res = await fetch(`https://fswd2-asgmt-movies-app-backend.onrender.com/getfantasymovie/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch fantasy movie ${id}`);
    }
    return await res.json();
  }, []);


  const deleteFantasyMovie = useCallback(async (id: string) => {
    await fetch(`https://fswd2-asgmt-movies-app-backend.onrender.com/deletefantasymovie/${id}`, {
      method: "DELETE",
    });

    setMyFantasyMovies((prev) => prev.filter((m) => m._id !== id));
  }, []);



  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,

        mustWatch,
        addToMustWatch,
        removeFromMustWatch,

        myReviews,

        genresList,
        genreMap,

        myFantasyMovies,
        addFantasyMovie,
        getFantasyMovieById,
        deleteFantasyMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
