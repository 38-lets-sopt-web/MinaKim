import { useQuery } from "@tanstack/react-query";
import { getMovieAccountStates } from "../api/movie-detail-api";
import { movieDetailQueryKeys } from "../api/movie-detail-query-keys";

export const useMovieAccountStates = (id: number) =>
  useQuery({
    queryKey: movieDetailQueryKeys.accountStates(id),
    queryFn: () => getMovieAccountStates(id),
    enabled: !!id,
  });
