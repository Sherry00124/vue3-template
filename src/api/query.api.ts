import request from "@/utils/request";
//查询Gcash账号
export function gcashAccountList(data: any, config?: Object) {
  return request({
    url: "query/merchant/gcashAccountList",
    method: "get",
    params: data,
    ...config,
  });
}
//查询交易记录
export function transactionRecordsList(data: any, config?: Object) {
  return request({
    url: "query/merchant/transactionRecordsList",
    method: "get",
    params: data,
    ...config,
  });
}
//查询流水
export function transferList(data: any, config?: Object) {
  return request({
    url: "query/merchant/transferList",
    method: "get",
    params: data,
    ...config,
  });
}
//导出流水
export function exportTransferList(data: any, config?: Object) {
  return request({
    url: "query/merchant/exportTransferList",
    method: "get",
    params: data,
    ...config,
  });
}
