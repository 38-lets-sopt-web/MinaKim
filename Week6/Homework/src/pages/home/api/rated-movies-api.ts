import { http } from "@/shared/lib/axios/http";
import { getGuestSessionId } from "@/shared/lib/tmdb/guest-session";
import { API_ENDPOINTS } from "@/shared/lib/tmdb/api-endpoints";
import {
  ratedMoviesResponseSchema,
  type RatedMovie,
} from "./rated-movies-schema";

export type { RatedMovie };

export const getRatedMovies = async (): Promise<RatedMovie[]> => {
  const guestSessionId = await getGuestSessionId();
  const data = await http.get(
    API_ENDPOINTS.GUEST_SESSION.RATED_MOVIES(guestSessionId),
    { language: "ko-KR", sort_by: "created_at.desc" }
  );
  return ratedMoviesResponseSchema.parse(data).results;
};
