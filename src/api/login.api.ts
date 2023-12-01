import request from "@/utils/request";

export function login(data: any, config?: Object) {
  return request({
    url: "/login",
    method: "post",
    data: data,
    ...config,
  });
}

export function getMerchantInfo(config?: Object) {
  return request({
    url: "/getUserInfo",
    method: "get",
    ...config,
  });
}
