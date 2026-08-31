import React, { useContext } from "react"
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../contexts/moviesContext";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions } from "@mui/material";

const MyFantasyMoviesPage: React.FC = () => {
  const { myFantasyMovies, deleteFantasyMovie } = useContext(MoviesContext);

  const styles = {
    root: {
      backgroundColor: "#bfbfbf",
    },
    fab: {
      marginTop: 8,
      position: "fixed",
      top: 20,
      left: 2,
    },
  };

  const navigate = useNavigate();

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => {
          navigate(
            '/myfantasymovies/form', {
            // state={
            // movieId,
            // type,
            // }
          });
        }}
        sx={styles.fab}
      >
        Create a Fantasy Movie
      </Fab >

      <Grid container spacing={3} sx={{ padding: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h2" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          >
            My Fantasy Movies
          </Typography>
        </Grid>

        {myFantasyMovies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="350"
                image={movie.image_path}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h5">{movie.title}</Typography>
                <Typography variant="body2">
                  Genres: {movie.genres.join(", ")}
                </Typography>
                <Typography variant="body2">
                  Directors: {movie.directors.join(", ")}
                </Typography>
                <Typography variant="body2">
                  Cast:{" "}
                  {movie.cast
                    .map((c) => `${c.realName} as ${c.fictionName}`)
                    .join(", ")}
                </Typography>
              </CardContent>

              <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/myfantasymovie/${movie._id}`)}
                >
                  View
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteFantasyMovie(movie._id)}                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

    </>
  );
};

export default MyFantasyMoviesPage;