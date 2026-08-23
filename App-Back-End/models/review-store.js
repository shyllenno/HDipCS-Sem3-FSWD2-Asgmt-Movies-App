import { ReviewSchema } from "./schemas.js";

export const reviewStore = {
    async addReview(review) {
        return ReviewSchema.create(review);
    },

    async getReviews() {
        return ReviewSchema.find();
    },

    async deleteReview(reviewId){
        return ReviewSchema.deleteOne({ _id: reviewId });
    }
};