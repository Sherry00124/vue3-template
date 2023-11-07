import type { TableColumnsType } from "ant-design-vue";
const columns: TableColumnsType = [
  { title: "Id", dataIndex: "id", key: "2", fixed: "left" },
  { title: "MerchantId", dataIndex: "merchantId", key: "3" },
  { title: "OpsType", dataIndex: "opsType", key: "4" },
  { title: "Amount", dataIndex: "amount", key: "age" },
  { title: "Status", dataIndex: "status", key: "tags" },
  { title: "TransactionBizType", dataIndex: "transactionBizType", key: "6" },
  { title: "TransactionTime", dataIndex: "transactionTime", key: "7" },
  { title: "TxId", dataIndex: "txId", key: "8" },
];

export default columns;
