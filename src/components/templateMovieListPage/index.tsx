import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { BaseMovieProps, MovieListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  }
};


// Reference: https://dev.to/tlylt/typescript-generic-function-reported-as-jsx-error-57nf
// const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({ movies, title, action }) => {
const MovieListPageTemplate = <T extends BaseMovieProps>({movies, title, action}: MovieListPageTemplateProps<T>) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList
          action={action}
          movies={movies}
        ></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
