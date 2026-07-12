import { favouritesStore } from "../models/favourites-store.js";

export const favouritesController = {

    addFavourite: {
        handler: async function(request, h) {
            const { movieId } = request.payload;
            await favouritesStore.addToFavourites(movieId);
            return h.response({ success: true }).code(200);
        },
    },

    getFavourites: {
        handler: async function (request, h) {
            const favourites = await favouritesStore.getFavourites();
            return favourites;
        }
    },

    removeFavourite: {
        handler: async function (request, h) {
            const movieId = Number(request.params.movieId);
            await favouritesStore.removeFromFavourites(movieId);
            return h.response({ success: true }).code(200);
        }
    },

};