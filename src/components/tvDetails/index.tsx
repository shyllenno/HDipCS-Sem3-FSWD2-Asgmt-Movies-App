import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"; // reuse reviews
import { TVDetailsProps } from "../../types/interfaces";

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
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
};

const TVDetails: React.FC<TVDetailsProps> = (tv) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const runtime =
    tv.episode_run_time && tv.episode_run_time.length > 0
      ? `${tv.episode_run_time[0]} min`
      : "N/A";

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {tv.overview}
      </Typography>

      {/* Genres */}
      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {tv.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>

      {/* TV-specific chips */}
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`Episode Runtime: ${runtime}`} />

        <Chip
          icon={<StarRate />}
          label={`${tv.vote_average} (${tv.vote_count})`}
        />

        <Chip label={`First Air: ${tv.first_air_date}`} />
        <Chip label={`Last Air: ${tv.last_air_date}`} />

        <Chip label={`Seasons: ${tv.number_of_seasons}`} />
        <Chip label={`Episodes: ${tv.number_of_episodes}`} />

        <Chip
          label={`Status: ${tv.in_production ? "In Production" : "Ended"
            }`}
        />

        <Chip label={`Type: ${tv.type}`} />
      </Paper>

      {/* Reviews Drawer */}
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews {...tv} />
      </Drawer>
    </>
  );
};

export default TVDetails;
