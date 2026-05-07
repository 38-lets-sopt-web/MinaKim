import type {AxiosInstance} from 'axios';
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
