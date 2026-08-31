import React from "react";
import { MyFantasyMovieProps } from "../../types/interfaces";

const FantasyMovieDetails: React.FC<MyFantasyMovieProps> = ({
  title,
  plot,
  genres,
  directors,
  cast,
}) => {
  return (
    <div style={{ padding: "1rem" }}>
      <h3>Plot</h3>
      <p>{plot}</p>

      <h3>Genres</h3>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>

      <h3>Directors</h3>
      <ul>
        {directors.map((director, index) => (
          <li key={`${title}-${director}-${index}`}>{director}</li>
        ))}
      </ul>

      <h3>Cast</h3>
      <ul>
        {cast.map((member, index) => (
          <li key={`${title}-${member.realName}-${member.fictionName}-${index}`}>
            {member.realName} as <strong>{member.fictionName}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FantasyMovieDetails;
