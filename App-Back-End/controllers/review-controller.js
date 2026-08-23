import { reviewStore } from "../models/review-store.js";

export const reviewController = {
    addReview: {
        handler: async function (request, h) {
            const review = request.payload;
            await reviewStore.addReview(review);
            return h.response({ sucess: true }).code(200);

        },
    },

    getReviews: {
        handler: async function (request, h) {
            const review = await reviewStore.getReviews();
            return review;
        },
    },

    deleteReview: {
        handler: async function (request, h) {
            const reviewID = request.params.reviewId;
            await reviewStore.deleteReview(reviewID);
            return h.response({ sucess: true }).code(200);
        }
    }
};