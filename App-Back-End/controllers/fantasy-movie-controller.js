import { fantasyMovieStore } from "../models/fantasy-movie-store.js";

export const fantasyMovieController = {
  addFantasyMovie: {
    handler: async function (request, h) {
      const movie = request.payload;
      await fantasyMovieStore.addFantasyMovie(movie);
      return h.response({ success: true }).code(200);
    },
  },

  getFantasyMovies: {
    handler: async function (request, h) {
      const movies = await fantasyMovieStore.getFantasyMovies();
      return movies;
    },
  },
};
