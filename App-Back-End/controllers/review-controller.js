import { reviewStore } from "../models/review-store.js";

export const reviewController = {
    addReview: {
        handler: async function (request, h) {
            const review = request.payload;
            await reviewStore.addReview(review);
            return h.response({ sucess: true}).code(200);
            
        },
    },
};