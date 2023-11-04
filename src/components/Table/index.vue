<template>
  <a-table
    :columns="columns"
    :data-source="dataList"
    :scroll="{ x: 1500, y: 300 }"
    :pagination="{ defaultPageSize: params.pageSize }"
    @change="handleTableChange"
  >
  </a-table>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";

const dataList = ref([]);
const columns = ref([]);
interface Params {
  pageNo: number;
  pageSize: number;
  phone: string;
}

const params = reactive<Params>({
  pageNo: 1,
  pageSize: 8,
  phone: "8765432109",
});

const handleTableChange = (e: any) => {
  console.log(e);
  params.pageSize = e.pageSize;
  params.pageNo = e.current;
};
</script>
