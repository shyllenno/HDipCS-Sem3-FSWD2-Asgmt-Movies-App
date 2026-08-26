import mongoose from "mongoose";
import { FavouritesSchema } from "./schemas.js";

export const favouritesStore = {

  async addToFavourites(movieId) {
    // const newFavourite = new FavouritesSchema( {movieId} );
    // const favouriteObj = await newFavourite.save();
    // return favouriteObj;
    return FavouritesSchema.create(movieId);

  },

  async getFavourites() {
    return FavouritesSchema.find();
  },

  async removeFromFavourites(movieId) {
    return FavouritesSchema.deleteOne({ movieId });
  },

}