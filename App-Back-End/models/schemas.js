import mongoose from "mongoose";

const { Schema } = mongoose;

const favouritesSchema = new Schema({
    movieId: Number,
});

export const FavouritesSchema = mongoose.model("Favourites", favouritesSchema);