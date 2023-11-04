import request from "@/utils/request";

export function login(data: any) {
  return request({
    url: "query/login/login",
    method: "post",
    data: data,
  });
}

export function getMerchantInfo() {
  return request({
    url: "query/merchant/getMerchantInfo",
    method: "get",
  });
}
export function verification(key: any) {
  return request({
    url: "query/random/randomImage/" + key,
    method: "get",
  });
}
