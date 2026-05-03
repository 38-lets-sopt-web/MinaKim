import type {ApiResponse} from '@/shared/api/schema';
import type {AxiosError, AxiosInstance} from 'axios';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Public Axios Instance
 * 로그인, 회원가입
 */
export const publicAxios: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Private Axios Instance
 * 유저 정보 조회, 수정
 */
export const privateAxios: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Private 요청 인터셉터
privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      return Promise.reject(new Error('인증 토큰이 없습니다.'));
    }

    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleResponseError = (error: AxiosError<ApiResponse>) => {
  const errorMessage =
    error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';

  if (error.response?.status === 401) {
    console.error('인증이 만료되었습니다. 다시 로그인해 주세요.');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }

  return Promise.reject(new Error(errorMessage));
};

publicAxios.interceptors.response.use((res) => res, handleResponseError);
privateAxios.interceptors.response.use((res) => res, handleResponseError);
