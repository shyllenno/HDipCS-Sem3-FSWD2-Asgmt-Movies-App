import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";


interface MovieContextInterface {
  favourites: number[];
  addToFavourites: ((movie: BaseMovieProps) => void);
  removeFromFavourites: ((movie: BaseMovieProps) => void);
  addReview: ((movie: BaseMovieProps, review: Review) => void);

  mustWatch: number[];
  addToMustWatch: ((movie: BaseMovieProps) => void);
  removeFromMustWatch: ((movie: BaseMovieProps) => void);
}
const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => { },
  removeFromFavourites: () => { },
  addReview: (movie, review) => { movie.id, review },

  mustWatch: [],
  addToMustWatch: () => { },
  removeFromMustWatch: () => { },
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);

  React.useEffect(() => {
    fetch(`http://localhost:4000/getfavourites`)
      .then(res => res.json())
      .then( (data: { movieId: number}[]) => setFavourites(data.map(f => f.movieId)));
  }, []);

  const addToFavourites = useCallback(async (movie: BaseMovieProps) => {
    await fetch("http://localhost:4000/addtofavourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: movie.id }),
    });
    setFavourites(prev => [...prev, movie.id]);
  }, []);

  const removeFromFavourites = useCallback(async (movie: BaseMovieProps) => {
    await fetch(`http://localhost:4000/removefromfavourites/${movie.id}`, {
      method: "DELETE",
    });

    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
  }, []);

  const addReview = async (movie: BaseMovieProps, review: Review) => {
    await fetch ("http://localhost:4000/addreview", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(review),
    });
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
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
