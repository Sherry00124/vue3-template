<template>
  <TableComponents :data-list="accountList" :columns="columns" @table-action="selectQuery" />
  <a-modal v-model:open="open" :title="$t('gcashAccount.modalTitle')" @ok="handleOk" width="600">
    <div class="flex-column modal-body">
      <div style="text-align: right; margin-bottom: 2rem">
        <a-button type="primary" @click="exportData">{{ $t("gcashAccount.export") }}</a-button>
      </div>
      <TableComponents :data-list="transactionRecordsList" :columns="transactionRecordsColumns" />
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import * as XLSX from "xlsx";
import type { TableColumnsType } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import { gcashAccountList, transferList, exportTransferList } from "@/api/query.api";
import { getUserInfo } from "@/utils/storage/auth";
import TableComponents from "@/components/Table/index.vue";
import { useI18n } from "vue-i18n";
const open = ref<boolean>(false);
const accountList = ref([]);
const transactionRecordsList = ref([]);
onMounted(() => {
  getList();
});
interface Params {
  pageNo: number;
  pageSize: number;
}
const params = reactive<Params>({
  pageNo: 1,
  pageSize: 8,
});

const inputData = ref({ phone: "" });
/**
 * 获取Gcash列表
 */
async function getList() {
  await gcashAccountList(params).then((res) => {
    accountList.value = res.result.records;
  });
}

/**
 * 确认查询某个Gcash对应流水
 */
async function selectQuery(record: any) {
  inputData.value.phone = record.msisdn;
  await transferList(inputData.value).then((res) => {
    open.value = true;
    transactionRecordsList.value = res.result.records;
  });
}
/**
 * Gcash列表分页
 */
const handleTableChange = (e: any) => {
  params.pageSize = e.pageSize;
  params.pageNo = e.current;
};

const handleOk = (e: MouseEvent) => {
  open.value = false;
};
/**
 * 导出
 */
async function exportData() {
  await exportTransferList(inputData.value).then((res) => {
    ExportXlsx(res.result);
  });
}

const ExportXlsx = (list: any) => {
  const data = XLSX.utils.json_to_sheet(list);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, data, "data");
  XLSX.writeFile(wb, "data.xlsx");
};

const columns: TableColumnsType = [
  { title: "id", width: 150, dataIndex: "id", key: "name", fixed: "left" },
  { title: "mpin", width: 100, dataIndex: "mpin", key: "age", fixed: "left" },
  { title: "msisdn", dataIndex: "msisdn", key: "1", width: 150 },
  { title: "pubKey", dataIndex: "pubKey", key: "2", width: 150 },
  { title: "priKey", dataIndex: "priKey", key: "3", width: 150 },
  { title: "publicUserId", dataIndex: "publicUserId", key: "4", width: 150 },
  { title: "proxyIp", dataIndex: "proxyIp", key: "5", width: 150 },
  { title: "udt", dataIndex: "udt", key: "6", width: 200 },
  { title: "xflowId", dataIndex: "xflowId", key: "7", width: 150 },
  { title: "xudid", dataIndex: "xudid", key: "8", width: 150 },
  { title: "xcorrelatorId", dataIndex: "xcorrelatorId", key: "9", width: 150 },
  {
    title: "Action",
    key: "operation",
    dataIndex: useI18n().t("gcashAccount.query"),
    fixed: "right",
    width: 100,
  },
];

const transactionRecordsColumns: TableColumnsType = [
  { title: "account", dataIndex: "account", key: "name", fixed: "left" },
  { title: "amount", dataIndex: "amount", key: "age", fixed: "left" },
  { title: "createBy", dataIndex: "createBy", key: "1" },
  { title: "createTime", dataIndex: "createTime", key: "2" },
  { title: "delFlag", dataIndex: "delFlag", key: "3" },
  { title: "gcashOrderNo", dataIndex: "gcashOrderNo", key: "4" },
  { title: "payPhone", dataIndex: "payPhone", key: "5" },
  { title: "payTime", dataIndex: "payTime", key: "6" },
  { title: "recPhone", dataIndex: "recPhone", key: "7" },
  { title: "transferLogsJson", dataIndex: "transferLogsJson", key: "9" },
];
</script>
<style lang="scss" scoped>
.modal-body {
  padding: 10px;
}
</style>
