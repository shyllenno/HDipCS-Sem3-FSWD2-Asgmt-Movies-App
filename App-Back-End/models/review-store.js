import { ReviewSchema } from "./schemas.js";

export const reviewStore = {
    async addReview(review) {
        return ReviewSchema.create(review);
    },
};