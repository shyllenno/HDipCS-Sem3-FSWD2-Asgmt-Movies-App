import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import Header from "../headerMovieList";

import { BaseMovieProps } from "../../types/interfaces";
import { Review } from "../../types/interfaces";

type MovieWithReview = BaseMovieProps & { reviews: Review[] };

interface Props {
  movies: MovieWithReview[];
  title: string;
}

const MovieReviewTable: React.FC<Props> = ({ movies, title }) => {
  return (
    <div>
      <Header title={title} />

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>Movie</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Review</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: "80px", borderRadius: "4px" }}
                  />
                </TableCell>

                <TableCell>{movie.title}</TableCell>

                <TableCell>
                  {movie.reviews.map((rev, i) => (
                    <div key={i}>
                      {rev.rating}/5
                    </div>
                  ))}
                </TableCell>

                <TableCell>
                  {movie.reviews.map((rev, i) => (
                    <div key={i}>
                      {rev.content}
                    </div>
                  ))}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MovieReviewTable;
