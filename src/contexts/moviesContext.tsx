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

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
  }, []);

  const addReview = (movie: BaseMovieProps, review: Review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
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
