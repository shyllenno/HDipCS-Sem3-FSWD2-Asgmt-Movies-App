import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
// React-Query introduced during exercise 1
// I went further than "get your code working again"
// I just refactored it to comply with the new model
import { useQuery } from "react-query";
import { UpcomingMovies } from "../types/interfaces";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};
const sortFiltering = {
  name: "sort",
  value: "none",
  condition: () => true,
};

const UpcomingPage: React.FC = () => {
  // React-Query introduced during exercise 1
  // I went further than "get your code working again"
  // I just refactored it to comply with the new model  
  const { data, error, isLoading, isError } = useQuery<UpcomingMovies, Error>("upcoming", getUpcomingMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering, sortFiltering,]
  );

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map(filter => filter.name === type ? changedFilter : filter);
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];

  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title='Upcoming Movies'
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToPlaylistIcon movie={movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        sortFilter={filterValues[2].value}
      />
    </>
  );
};

export default UpcomingPage;