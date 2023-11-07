import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { message } from "ant-design-vue";
import { removeToken, removeUserInfo } from "@/utils/storage/auth";
import { getToken } from "@/utils/storage/auth";

// 创建 Axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000000,
});

declare module "axios" {
  interface AxiosResponse<T = any> {
    // 这个地方放属性
    result: any;
    message: string;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["X-Access-Token"] = getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 200) {
      message.error(res.message || "Error");
      return new Error(res.message || "Error");
    } else {
      return res;
    }
  },
  (error: AxiosError) => {
    message.error(error.message);
    if (error.response?.status === 401) {
      window.location.href = "/login";
      removeUserInfo();
      removeToken();
    }
    return Promise.reject(error);
  }
);

export default service;
