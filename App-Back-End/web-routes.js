import { favouritesController } from "./controllers/favourites-controller.js";
import { reviewController } from "./controllers/review-controller.js";
import { fantasyMovieController } from "./controllers/fantasy-movie-controller.js";

export const webRoutes = [
  { method: "POST", path: "/addtofavourites", config: favouritesController.addFavourite },
  { method: "GET", path: "/getfavourites", config: favouritesController.getFavourites },
  { method: "DELETE", path: "/removefromfavourites/{movieId}", config: favouritesController.removeFavourite },

  { method: "POST", path: "/addreview", config: reviewController.addReview },
  { method: "GET", path: "/getreviews", config: reviewController.getReviews },
  { method: "DELETE", path: "/deletereview/{reviewId}", config: reviewController.deleteReview },

  { method: "POST", path: "/addfantasymovie", config: fantasyMovieController.addFantasyMovie },
  { method: "GET", path: "/getfantasymovies", config: fantasyMovieController.getFantasyMovies },
  { method: "GET", path: "/getfantasymovie/{id}", config: fantasyMovieController.getFantasyMovieById },
  { method: "DELETE", path: "/deletefantasymovie/{id}", config: fantasyMovieController.deleteFantasyMovie },



];
