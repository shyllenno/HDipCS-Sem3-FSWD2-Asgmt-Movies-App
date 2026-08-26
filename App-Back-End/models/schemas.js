import mongoose from "mongoose";

const { Schema } = mongoose;

const favouritesSchema = new Schema({
    movieId: Number,
    type: String,
});

export const FavouritesSchema = mongoose.model("Favourites", favouritesSchema);

const reviewSchema = new Schema({
    movieId: Number,
    author: String,
    content: String,
    rating: Number,
});

export const ReviewSchema = mongoose.model("Review", reviewSchema);