import { http } from "@/shared/lib/axios/http";
import { API_ENDPOINTS } from "@/shared/lib/tmdb/api-endpoints";

const STORAGE_KEY = "tmdb_guest_session_id";

interface GuestSessionResponse {
  success: boolean;
  guest_session_id: string;
}

const createGuestSession = async (): Promise<string> => {
  const data = await http.get<GuestSessionResponse>(
    API_ENDPOINTS.AUTH.GUEST_SESSION
  );
  localStorage.setItem(STORAGE_KEY, data.guest_session_id);
  return data.guest_session_id;
};

export const getGuestSessionId = async (): Promise<string> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return createGuestSession();
};
