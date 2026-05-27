import { http } from "@/shared/lib/axios/http";
import { getGuestSessionId } from "@/shared/lib/tmdb/guest-session";
import { API_ENDPOINTS } from "@/shared/lib/tmdb/api-endpoints";
import {
  accountStatesSchema,
  movieDetailSchema,
  type AccountStates,
  type MovieDetail,
} from "@/pages/[id]/api/movie-detail-schema";

export const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  const data = await http.get<MovieDetail>(API_ENDPOINTS.MOVIE.DETAIL(id), {
    language: "ko-KR",
  });
  return movieDetailSchema.parse(data);
};

export const getMovieAccountStates = async (
  id: number,
): Promise<AccountStates> => {
  const guestSessionId = await getGuestSessionId();
  const data = await http.get<AccountStates>(
    API_ENDPOINTS.MOVIE.ACCOUNT_STATES(id),
    { guest_session_id: guestSessionId },
  );
  return accountStatesSchema.parse(data);
};

export const postMovieRating = async (
  id: number,
  value: number,
): Promise<void> => {
  const guestSessionId = await getGuestSessionId();
  await http.post(
    API_ENDPOINTS.MOVIE.RATING(id),
    { value },
    { guest_session_id: guestSessionId },
  );
};

export const deleteMovieRating = async (id: number): Promise<void> => {
  const guestSessionId = await getGuestSessionId();
  await http.delete(API_ENDPOINTS.MOVIE.RATING(id), {
    guest_session_id: guestSessionId,
  });
};
