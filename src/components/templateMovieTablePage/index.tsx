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

interface ReviewRow {
  movieId: number;
  title: string;
  poster_path?: string;
  rating: number;
  content: string;
}

interface Props {
  rows: ReviewRow[];
  title: string;
}

const MovieReviewTable: React.FC<Props> = ({ rows: rows = [], title }) => {
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
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${row.poster_path}`}
                    alt={row.title}
                    style={{ width: "80px", borderRadius: "4px" }}
                  />
                </TableCell>

                <TableCell>{row.title}</TableCell>
                <TableCell>{row.rating}/5</TableCell>
                <TableCell>{row.content}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MovieReviewTable;
