<template>
  <TableComponents
    :data-list="accountList"
    :columns="columns"
    :page="pageAccount"
    @table-action="selectQuery"
    @refresh="accountRefresh"
  />
</template>
<script lang="ts" setup>
import * as XLSX from "xlsx";
import type { TableColumnsType } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import { checkAccountList } from "@/api/query.api";
import TableComponents from "@/components/Table/index.vue";
import { useI18n } from "vue-i18n";

const accountList = ref([]);

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

/**
 * 获取列表
 */
async function getList() {
  await checkAccountList(pageAccount, { loading: true }).then((res) => {
    console.log(res);
    accountList.value = res.result.records;
    pageAccount.total = res.result.total;
  });
}
/**
 * 刷新列表
 */
async function accountRefresh() {
  pageAccount.pageNo = 1;
  pageAccount.pageSize = 8;
  getList();
}

/**
 * 导出
 */
async function exportData() {
  ExportXlsx(accountList.value);
}

const ExportXlsx = (list: any) => {
  const data = XLSX.utils.json_to_sheet(list);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, data, "data");
  XLSX.writeFile(wb, "data.xlsx");
};

const selectQuery = () => {};
const columns: TableColumnsType = [
  {
    title: useI18n().t("table.id"),
    width: 150,
    dataIndex: "id",
    key: "text",
    fixed: "left",
  },
  { title: useI18n().t("table.name"), dataIndex: "name", key: "1", width: 150 },
  { title: useI18n().t("table.mobile"), dataIndex: "mobile", key: "tags", width: 200 },
  {
    title: useI18n().t("table.action"),
    key: "operation",
    dataIndex: useI18n().t("table.query"),
    fixed: "right",
    width: 100,
  },
];
</script>
<style lang="scss" scoped>
.modal-body {
  padding: 10px;
}
</style>
