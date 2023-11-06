<template>
  <div class="flex-column-center container">
    <div v-if="dataList.length == 0">
      <a-empty />
    </div>
    <div v-else>
      <a-table
        :columns="columns"
        :data-source="dataList"
        :scroll="{ x: 1500, y: 300 }"
        :pagination="{ defaultPageSize: params.pageSize }"
        @change="handleTableChange"
      >
      </a-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { TableColumnsType } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import { transactionRecordsList } from "@/api/query.api";

const dataList = ref([]);
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

async function getList() {
  await transactionRecordsList(params).then((res) => {
    console.log(res.result.records);
    dataList.value = res.result.records;
  });
}

const handleTableChange = (e: any) => {
  console.log(e);
  params.pageSize = e.pageSize;
  params.pageNo = e.current;
};
const columns: TableColumnsType = [
  { title: "Full Name", width: 100, dataIndex: "name", key: "name", fixed: "left" },
  { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  { title: "Column 1", dataIndex: "address", key: "1", width: 150 },
  { title: "Column 2", dataIndex: "address", key: "2", width: 150 },
  { title: "Column 3", dataIndex: "address", key: "3", width: 150 },
  { title: "Column 4", dataIndex: "address", key: "4", width: 150 },
  { title: "Column 5", dataIndex: "address", key: "5", width: 150 },
  { title: "Column 6", dataIndex: "address", key: "6", width: 150 },
  { title: "Column 7", dataIndex: "address", key: "7", width: 150 },
  { title: "Column 8", dataIndex: "address", key: "8" },
];
</script>
