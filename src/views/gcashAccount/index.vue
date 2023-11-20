<template>
  <TableComponents
    :data-list="accountList"
    :columns="columns"
    :page="pageAccount"
    @table-action="selectQuery"
    @refresh="accountRefresh"
    @change-page="accountPageChange"
  />
  <a-modal v-model:open="open" :title="$t('gcashAccount.modalTitle')" @ok="handleOk" width="600">
    <div class="flex-column modal-body">
      <div style="text-align: right; margin-bottom: 2rem">
        <a-button type="primary" @click="exportData">{{ $t("gcashAccount.export") }}</a-button>
      </div>
      <TableComponents
        :data-list="transactionRecordsList"
        :columns="transactionRecordsColumns"
        :page="pageTransaction"
        @change-page="transactionPageChange"
        @refresh="transactionRefresh"
      />
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
interface PageSet {
  pageNo: number;
  pageSize: number;
  total: number;
}

const pageAccount = reactive<PageSet>({
  pageNo: 1,
  pageSize: 8,
  total: 0,
});

const pageTransaction = reactive<PageSet>({
  pageNo: 1,
  pageSize: 5,
  total: 0,
});

const inputData = ref({ phone: "" });
/**
 * 获取Gcash列表
 */
async function getList() {
  await gcashAccountList(pageAccount, { loading: true }).then((res) => {
    accountList.value = res.result.records;
    pageAccount.total = res.result.total;
  });
}
/**
 * 刷新Gcash列表
 */
async function accountRefresh() {
  pageAccount.pageNo = 1;
  pageAccount.pageSize = 8;
  getList();
}

/**
 * 确认查询某个Gcash对应流水
 */
const selectQuery = (record: any) => {
  inputData.value.phone = record.msisdn;
  getTransactionList();
};

/**
 * 查询Gcash流水
 */
async function getTransactionList() {
  let data = {
    ...inputData.value,
    ...pageTransaction,
  };
  await transferList(data, { loading: true }).then((res) => {
    open.value = true;
    transactionRecordsList.value = res.result.records;
    pageTransaction.total = res.result.total;
  });
}
/**
 * 流水分页
 */
const transactionPageChange = (e: any) => {
  pageTransaction.pageSize = e.pageSize;
  pageTransaction.pageNo = e.current;
  getTransactionList();
};
/**
 * 流水刷新
 */
async function transactionRefresh(e: any) {
  pageTransaction.pageNo = 1;
  pageTransaction.pageSize = 5;
  getTransactionList();
}
/**
 * Gcash列表分页
 */
const accountPageChange = (e: any) => {
  pageAccount.pageSize = e.pageSize;
  pageAccount.pageNo = e.current;
  getList();
};

const handleOk = (e: MouseEvent) => {
  open.value = false;
};
/**
 * 导出
 */
async function exportData() {
  await exportTransferList(inputData.value, { loading: true }).then((res) => {
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
  {
    title: useI18n().t("gcashAccount.id"),
    width: 150,
    dataIndex: "id",
    key: "name",
    fixed: "left",
  },
  { title: useI18n().t("gcashAccount.msisdn"), dataIndex: "msisdn", key: "1", width: 150 },
  { title: useI18n().t("gcashAccount.udt"), dataIndex: "udt", key: "6", width: 200 },
  {
    title: useI18n().t("gcashAccount.action"),
    key: "operation",
    dataIndex: useI18n().t("gcashAccount.query"),
    fixed: "right",
    width: 100,
  },
];

const transactionRecordsColumns: TableColumnsType = [
  { title: useI18n().t("gcashAccount.gcashOrderNo"), dataIndex: "gcashOrderNo", key: "4" },
  { title: useI18n().t("gcashAccount.amount"), dataIndex: "amount", key: "age", fixed: "left" },
  { title: useI18n().t("gcashAccount.recPhone"), dataIndex: "recPhone", key: "7" },
  { title: useI18n().t("gcashAccount.payPhone"), dataIndex: "payPhone", key: "5" },
  { title: useI18n().t("gcashAccount.payTime"), dataIndex: "payTime", key: "6" },
];
</script>
<style lang="scss" scoped>
.modal-body {
  padding: 10px;
}
</style>
