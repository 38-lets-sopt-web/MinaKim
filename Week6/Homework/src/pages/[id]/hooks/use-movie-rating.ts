import { useMutation, useQueryClient } from "@tanstack/react-query";

import { movieQueryKeys } from "@/pages/home/api/movie-query-keys";
import {
  deleteMovieRating,
  postMovieRating,
} from "@/pages/[id]/api/movie-detail-api";
import { movieDetailQueryKeys } from "@/pages/[id]/api/movie-detail-query-keys";

export const usePostRating = (movieId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: number) => postMovieRating(movieId, value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: movieDetailQueryKeys.accountStates(movieId),
      });
      queryClient.invalidateQueries({ queryKey: movieQueryKeys.rated() });
    },
  });
};

export const useDeleteRating = (movieId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteMovieRating(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: movieDetailQueryKeys.accountStates(movieId),
      });
      queryClient.invalidateQueries({ queryKey: movieQueryKeys.rated() });
    },
  });
};
