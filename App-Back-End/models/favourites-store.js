import mongoose from "mongoose";
import { FavouritesSchema } from "./schemas.js";

export const favouritesStore = {

  async addToFavourites(movie) {
    const newFavourite = new FavouritesSchema(movie);
    const favouriteObj = await newFavourite.save();
    return favouriteObj;
  },

}