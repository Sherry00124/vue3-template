import request from "@/utils/request";

export function login(data: any) {
  return request({
    url: "query/merchant/transactionRecordsList",
    method: "post",
    data: data,
  });
}

export function getMerchantInfo(data: any) {
  return request({
    url: "query/merchant/getMerchantInfo",
    method: "get",
    data: data,
  });
}
