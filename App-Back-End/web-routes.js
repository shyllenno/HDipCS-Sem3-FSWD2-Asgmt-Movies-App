import { favouritesController } from "./controllers/favourites-controller.js";
import { reviewController } from "./controllers/review-controller.js";


export const webRoutes = [
  { method: "POST", path: "/addtofavourites", config: favouritesController.addFavourite },
  { method: "GET", path: "/getfavourites", config: favouritesController.getFavourites },
  { method: "DELETE", path: "/removefromfavourites/{movieId}", config: favouritesController.removeFavourite },

  { method: "POST", path: "/addreview", config: reviewController.addReview },
];
