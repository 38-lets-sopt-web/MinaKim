export const API_ENDPOINTS = {
  MOVIES: {
    DISCOVER: "/discover/movie",
  },
  MOVIE: {
    DETAIL: (id: number) => `/movie/${id}`,
    ACCOUNT_STATES: (id: number) => `/movie/${id}/account_states`,
    RATING: (id: number) => `/movie/${id}/rating`,
  },
  AUTH: {
    GUEST_SESSION: "/authentication/guest_session/new",
  },
  GUEST_SESSION: {
    RATED_MOVIES: (sessionId: string) =>
      `/guest_session/${sessionId}/rated/movies`,
  },
} as const;
