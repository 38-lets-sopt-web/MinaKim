import {privateAxios} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoint';
import type {ApiResponse, UserUpdateRequest} from '@/shared/api/schema';

export const userApi = {
  getUser: async (userId: string): Promise<ApiResponse> => {
    const response = await privateAxios.get<ApiResponse>(
      API_ENDPOINTS.USER.DETAIL(userId)
    );
    return response.data;
  },

  updateUser: async (
    userId: string,
    data: UserUpdateRequest
  ): Promise<ApiResponse> => {
    const response = await privateAxios.patch<ApiResponse>(
      API_ENDPOINTS.USER.DETAIL(userId),
      data
    );
    return response.data;
  },

  getUserList: async (): Promise<ApiResponse> => {
    const response = await privateAxios.get<ApiResponse>(
      API_ENDPOINTS.USER.BASE
    );
    return response.data;
  },
};
