import { instance } from "@/shared/lib/axios/instance";

export const http = {
  get: <T>(url: string, params?: object) =>
    instance.get<T>(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: object, params?: object) =>
    instance.post<T>(url, data, { params }).then((res) => res.data),

  delete: <T>(url: string, params?: object) =>
    instance.delete<T>(url, { params }).then((res) => res.data),
};
