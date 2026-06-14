export const API_ENDPOINTS = {
  AUTH: {
    SIGN_UP: '/api/v1/auth/signup',
    SIGN_IN: '/api/v1/auth/signin',
  },
  USER: {
    BASE: '/api/v1/users',
    DETAIL: (userId: number) => `/api/v1/users/${userId}`,
  },
} as const;
