import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { message } from "ant-design-vue";
import { removeToken, removeUserInfo } from "./auth";
import { getToken } from "@/utils/auth";

var baseURL = "";
// 根据环境设置 baseURL 和 websocketURL
if (process.env.NODE_ENV === "development") {
  baseURL = "https://dev.tradebridge.site/merchant/";
} else if (process.env.NODE_ENV === "test") {
  baseURL = "https://testcustom.tradebridge.site/merchant/";
} else {
  baseURL = "https://custom.tradebridge.site/merchant/";
}

console.log(process.env.VUE_APP_BASE_URL);
// 创建 Axios 实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 10000000,
});

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
      window.location.href = "/";
      removeUserInfo();
      removeToken();
    }
    return Promise.reject(error);
  }
);

export default service;
