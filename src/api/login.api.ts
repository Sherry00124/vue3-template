import request from "@/utils/request";
import { AxiosRequestConfig } from "axios";

export function login(data: any, config?: Object) {
  return request({
    url: "query/login/login",
    method: "post",
    data: data,
    ...config,
  });
}

export function getMerchantInfo(config?: Object) {
  return request({
    url: "query/merchant/getMerchantInfo",
    method: "get",
    ...config,
  });
}
export function verification(key: any, config?: Object) {
  return request({
    url: "query/random/randomImage/" + key,
    method: "get",
    ...config,
  });
}
