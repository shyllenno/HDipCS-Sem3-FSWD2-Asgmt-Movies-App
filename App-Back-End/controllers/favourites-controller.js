import { favouritesStore } from "../models/favourites-store.js";

export const favouritesController = {

    addFavourite: {
        handler: async function(request, h) {
            const { movie } = request.payload;
            await favouritesStore.addToFavourites(movie);
            return h.response({ success: true }).code(200);
        },
    }

};