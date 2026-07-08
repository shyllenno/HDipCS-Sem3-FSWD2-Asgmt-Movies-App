import { favouritesController } from "./controllers/favourites-controller.js";


export const webRoutes = [
  { method: "POST", path: "/addtofavourites", config: favouritesController.addFavourite },
];
