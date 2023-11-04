<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :scroll="{ x: 1500, y: 300 }"
    :pagination="{ defaultPageSize: params.pageSize }"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a-popconfirm
          :title="$t('gcashAccount.queryConfirm')"
          ok-text="Yes"
          cancel-text="No"
          @confirm="() => (open = true)"
        >
          <a href="#">{{ $t("gcashAccount.query") }}</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <a-modal v-model:open="open" :title="$t('gcashAccount.modalTitle')" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<script lang="ts" setup>
import type { TableColumnsType } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import { gcashAccountList, transferList } from "@/api/query.api";
import { getUserInfo } from "@/utils/auth";

const open = ref<boolean>(false);

onMounted(() => {
  getList();
});
interface Params {
  pageNo: number;
  pageSize: number;
  phone: string;
}
const userInfo = getUserInfo();
const params = reactive<Params>({
  pageNo: 1,
  pageSize: 8,
  phone: userInfo ? userInfo.mobile : "",
});

/**
 * 获取Gcash列表
 */
async function getList() {
  await gcashAccountList(params).then((res) => {
    console.log(res);
  });
}
/**
 * 查询流水
 */
async function query() {
  await transferList().then((res) => {});
}

/**
 * 确认查询某个Gcash对应流水
 */
const confirmQuery = () => {};
/**
 * Gcash列表分页
 */
const handleTableChange = (e: any) => {
  console.log(e);
  params.pageSize = e.pageSize;
  params.pageNo = e.current;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
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
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
  },
];

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
</script>
