import request from "@/utils/request";
//查询Gcash账号
export function gcashAccountList(data: any, config?: Object) {
  return request({
    url: "/getAccountInfo",
    method: "get",
    params: data,
    ...config,
  });
}
