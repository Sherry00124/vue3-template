import request from "@/utils/request";

export function checkAccountList(data: any, config?: Object) {
  return request({
    url: "/getAccountInfo",
    method: "get",
    // params: data,
    ...config,
  });
}
