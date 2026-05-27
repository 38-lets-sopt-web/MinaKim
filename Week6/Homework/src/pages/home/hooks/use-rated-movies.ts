import { useQuery } from "@tanstack/react-query";
import { getRatedMovies } from "../api/rated-movies-api";
import { movieQueryKeys } from "../api/movie-query-keys";

export const useRatedMovies = () =>
  useQuery({
    queryKey: movieQueryKeys.rated(),
    queryFn: getRatedMovies,
  });
