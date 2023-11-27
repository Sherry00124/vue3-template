import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { message } from "ant-design-vue";
import { removeToken, removeUserInfo } from "@/utils/storage/auth";
import { getToken } from "@/utils/storage/auth";
import store from "@/store";
import app from "@/main";
import Loading from "@/components/Loading";
// 创建 Axios 实例
const service = axios.create({
  baseURL: "",
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

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
}
// 请求拦截器
service.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    if (config.loading) {
      app.config.globalProperties.$Loading.showLoading();
    }

    if (store.state.user.token) {
      config.headers["X-Access-Token"] = store.state.user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    app.config.globalProperties.$Loading.hideLoading();
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
