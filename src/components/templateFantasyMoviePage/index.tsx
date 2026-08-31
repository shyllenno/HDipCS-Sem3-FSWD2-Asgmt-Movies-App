import React from "react";
import { MyFantasyMovieProps } from "../../types/interfaces";

interface Props {
  movie: MyFantasyMovieProps;
  children: React.ReactNode;
}

const FantasyMoviePageTemplate: React.FC<Props> = ({ movie, children }) => {
  return (
    <div className="fantasy-movie-page">
      <div className="header">
        <img
          src={movie.image_path}
          alt={movie.title}
          className="fantasy-movie-poster"
        />
        <h2>{movie.title}</h2>
      </div>

      <div className="content">{children}</div>
    </div>
  );
};

export default FantasyMoviePageTemplate;
