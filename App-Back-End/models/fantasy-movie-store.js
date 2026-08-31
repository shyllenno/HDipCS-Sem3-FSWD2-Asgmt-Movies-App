import { FantasyMovieSchema } from "./schemas.js";

export const fantasyMovieStore = {
  async addFantasyMovie(movie) {
    return FantasyMovieSchema.create(movie);
  },

  async getFantasyMovies() {
    return FantasyMovieSchema.find();
  },

  async getFantasyMovieById(id) {
    return FantasyMovieSchema.findById(id);
  },

  async deleteFantasyMovie(id) {
    return FantasyMovieSchema.findByIdAndDelete(id);
  }

};
