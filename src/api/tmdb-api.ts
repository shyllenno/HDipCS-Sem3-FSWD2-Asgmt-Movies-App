export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then((res) => {
      if (!res.ok)
        throw new Error(`Unable to fetch movies. Response status: ${res.status}`);
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`Unable to get movie data. Response status: ${res.status}`);
    }
    return res.json()
  }).catch((error) => { throw error });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    import.meta.env.VITE_TMDB_KEY +
    "&language=en-US"
  )
    .then((res) => {
      if (!res.ok)
        throw new Error(`Unable to fetch genres. Response status: ${res.status}`);
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch the images for movie id: ${id}`);
      }
      return res.json()
    })
    .then((json) => json.posters)
    .catch((error) => { throw error });
};

export const getTVSerieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch the images for tv serie id: ${id}`);
      }
      return res.json()
    })
    .then((json) => json.posters)
    .catch((error) => { throw error });
};

export const getMovieReviews = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((res) => res.json()).then((json) => {
    console.log(json.results);
    return json.results;
  });
};

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then((res) => {
      if (!res.ok)
        throw new Error(`Unable to fetch upcoming movies. Response status: ${res.status}`);
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTVSeries = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
  )
    .then((res) => {
      if (!res.ok)
        throw new Error(`Unable to fetch TV series. Response status: ${res.status}`);
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTVSerie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`Unable to get tv serie data. Response status: ${res.status}`);
    }
    return res.json()
  }).catch((error) => { throw error });
};
