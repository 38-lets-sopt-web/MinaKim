import {publicAxios} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoint';
import type {
  ApiResponse,
  SignInRequest,
  SignUpRequest,
} from '@/shared/api/schema';

export const authApi = {
  signUp: async (data: SignUpRequest): Promise<ApiResponse> => {
    const response = await publicAxios.post<ApiResponse>(
      API_ENDPOINTS.AUTH.SIGN_UP,
      data
    );
    return response.data;
  },

  signIn: async (data: SignInRequest): Promise<ApiResponse> => {
    const response = await publicAxios.post<ApiResponse>(
      API_ENDPOINTS.AUTH.SIGN_IN,
      data
    );
    return response.data;
  },
};
