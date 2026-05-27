import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../api/movie-api";
import { movieQueryKeys } from "../api/movie-query-keys";

export const useMovies = (selectedRating: number | null) =>
  useInfiniteQuery({
    queryKey: movieQueryKeys.list(selectedRating),
    queryFn: ({ pageParam }) => getMovies(pageParam, selectedRating),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
