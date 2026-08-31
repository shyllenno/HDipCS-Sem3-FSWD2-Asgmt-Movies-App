import { fantasyMovieStore } from "../models/fantasy-movie-store.js";
import { imageStore } from "../models/image-store.js";

export const fantasyMovieController = {
  addFantasyMovie: {
    payload: {
      output: "file",
      parse: true,
      multipart: true,
    },

    handler: async function (request, h) {
      const raw = request.payload;

      const cast = [];
      Object.keys(raw).forEach((key) => {
        const match = key.match(/^cast\[(\d+)\]\[(\w+)\]$/);
        if (match) {
          const index = Number(match[1]);
          const field = match[2];
          cast[index] = cast[index] || {};
          cast[index][field] = raw[key];
        }
      });

      const genres = Array.isArray(raw.genres)
        ? raw.genres.map(Number)
        : [Number(raw.genres)];

      const directors = Array.isArray(raw.directors)
        ? raw.directors
        : [raw.directors];

      let image_path = "";
      const file = raw.imagefile;

      if (file) {
        image_path = await imageStore.uploadImage(file);
      } else {
        console.log("NO FILE RECEIVED");
      }

      const movie = {
        title: raw.title,
        plot: raw.plot,
        genres,
        directors,
        cast,
        image_path,
      };

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

  getFantasyMovieById: {
    handler: async function (request, h) {
      const { id } = request.params;

      const movie = await fantasyMovieStore.getFantasyMovieById(id);
      if (!movie) {
        return h.response({ error: "Movie not found" }).code(404);
      }

      return movie; // Hapi automatically returns JSON
    }
  },

  deleteFantasyMovie: {
    handler: async function (request, h) {
      const { id } = request.params;

      const movie = await fantasyMovieStore.getFantasyMovieById(id);
      if (!movie) {
        return h.response({ error: "Movie not found" }).code(404);
      }

      // Optional: delete Cloudinary image
      if (movie.image_path) {
        const publicId = movie.image_path.split("/").pop().split(".")[0];
        await imageStore.deleteImage(publicId);
      }

      await fantasyMovieStore.deleteFantasyMovie(id);

      return h.response({ success: true }).code(200);
    }
  }

};
