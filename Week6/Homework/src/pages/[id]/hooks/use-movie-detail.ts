import { getMovieDetail } from "@/pages/[id]/api/movie-detail-api";
import { movieDetailQueryKeys } from "@/pages/[id]/api/movie-detail-query-keys";
import { useQuery } from "@tanstack/react-query";

export const useMovieDetail = (id: number) =>
  useQuery({
    queryKey: movieDetailQueryKeys.detail(id),
    queryFn: () => getMovieDetail(id),
    enabled: !!id,
  });
