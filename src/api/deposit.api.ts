import request from "@/utils/request";

export function deposit(data: any) {
  return request({
    url: "query/topup/topUpByTxId",
    method: "post",
    data: data,
  });
}
