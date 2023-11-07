<template>
  <div class="container">
    <TableComponents
      :data-list="dataList"
      :columns="columns"
      :page="page"
      @change-page="handleTableChange"
      @refresh="refresh"
    />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { transactionRecordsList } from "@/api/query.api";
import TableComponents from "@/components/Table/index.vue";
import columns from "./transactionoList.data";
const dataList = ref([]);
onMounted(() => {
  getList();
});
interface PageSet {
  pageNo: number;
  pageSize: number;
  total: number;
}

const page = reactive<PageSet>({
  pageNo: 1,
  pageSize: 8,
  total: 0,
});

/**
 * 获取列表
 */
async function getList() {
  await transactionRecordsList(page).then((res) => {
    dataList.value = res.result.records;
    page.total = res.result.total;
  });
}
/**
 *
 * @param e 分页
 */
const handleTableChange = (e: any) => {
  page.pageSize = e.pageSize;
  page.pageNo = e.current;
  getList();
};
/**
 * 刷新
 */
async function refresh() {
  page.pageNo = 1;
  page.pageSize = 8;
  getList();
}
</script>
