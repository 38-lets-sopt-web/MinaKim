import { http } from "@/shared/lib/axios/http";
import { API_ENDPOINTS } from "@/shared/lib/tmdb/api-endpoints";
import {
  movieListResponseSchema,
  type MovieListResponse,
} from "./movie-schema";

export const getMovies = async (
  page: number,
  selectedRating: number | null
): Promise<MovieListResponse> => {
  const ratingParams =
    selectedRating !== null
      ? {
          "vote_average.gte": selectedRating,
          "vote_average.lte": selectedRating < 10 ? selectedRating + 0.9 : 10,
        }
      : {};

  const data = await http.get<MovieListResponse>(API_ENDPOINTS.MOVIES.DISCOVER, {
    page,
    sort_by: "popularity.desc",
    "vote_count.gte": 100,
    language: "ko-KR",
    ...ratingParams,
  });
  return movieListResponseSchema.parse(data);
};
