import React, { useContext } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { MoviesContext } from "../../contexts/moviesContext";
import { MyFantasyMovieProps } from "../../types/interfaces";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
};

const FantasyMovieDetails: React.FC<MyFantasyMovieProps> = ({
  title,
  plot,
  genres,
  directors,
  cast,
}) => {
  const { genreMap } = useContext(MoviesContext);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {plot}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {genres.map((id) => (
          <li key={id}>
            <Chip label={genreMap[id]} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Directors" sx={styles.chipLabel} color="primary" />
        </li>
        {directors.map((d, index) => (
          <li key={`${title}-${d}-${index}`}>
            <Chip label={d} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Cast" sx={styles.chipLabel} color="primary" />
        </li>
        {cast.map((member, index) => (
          <li key={`${title}-${member.realName}-${member.fictionName}-${index}`}>
            <Chip label={`${member.realName} as ${member.fictionName}`} />
          </li>
        ))}
      </Paper>
    </>
  );
};

export default FantasyMovieDetails;
