import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {BaseMovieProps} from "../../types/interfaces"
import { Link } from "react-router-dom";


interface WriteReviewIconProps {
  movieId: number;
  type: "movie" | "tv";
}
const WriteReviewIcon:React.FC<WriteReviewIconProps> = ({movieId, type}) => { 
  return (
    <Link
    to={'/reviews/form'}
    state={{
        movieId,
        type,
      }}
  >
    <RateReviewIcon color="primary" fontSize="large" />
  </Link>
  );
};

export default  WriteReviewIcon;
