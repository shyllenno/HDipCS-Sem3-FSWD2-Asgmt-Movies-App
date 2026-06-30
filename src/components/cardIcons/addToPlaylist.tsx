import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/interfaces"

interface AddToPlaylistProps {
  movie: BaseMovieProps;
}

const AddToPlaylistIcon: React.FC<AddToPlaylistProps> = ({ movie }) => {

  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };
  return (
    <IconButton aria-label="add to playlist" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;