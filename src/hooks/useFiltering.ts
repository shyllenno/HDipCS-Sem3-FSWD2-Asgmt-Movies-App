import { useState } from "react";

interface Filter {
  name: string;
  value: string;
  condition: (item: any, value: string) => boolean;
}

const applySort = (movies: any[], sortValue: string) => {
  if (sortValue === "title-asc") {
    return [...movies].sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortValue === "title-desc") {
    return [...movies].sort((a, b) => b.title.localeCompare(a.title));
  }

  return movies;
};

const useFiltering = (filters: Filter[]) => {
  const [filterValues, setFilterValues] = useState(() => {
    const filterInitialValues = filters.map((f) => ({
      name: f.name,
      value: f.value,
    }));
    return filterInitialValues;
  });


  const filterFunction = (collection: any[]) => {
    let result = collection;

    filters.forEach((filter, index) => {
      const value = filterValues[index].value;

      if (filter.name === "sort") {
        result = applySort(result, value);
        return;
      }

      result = result.filter((item) =>
        filter.condition(item, value)
      );
    });

    return result;
  };

  return {
    filterValues,
    setFilterValues,
    filterFunction,
  };
};

export default useFiltering;
