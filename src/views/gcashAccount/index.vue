<template>
  <a-table
    :columns="columns"
    :data-source="accountList"
    :pagination="{ defaultPageSize: params.pageSize }"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <a-popconfirm
          :title="$t('gcashAccount.queryConfirm')"
          ok-text="Yes"
          cancel-text="No"
          @confirm="selectQuery(record)"
        >
          <a href="#">{{ $t("gcashAccount.query") }}</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <a-modal v-model:open="open" :title="$t('gcashAccount.modalTitle')" @ok="handleOk" width="600">
    <div class="flex-column modal-body">
      <div style="text-align: right; margin-bottom: 2rem">
        <a-button type="primary">{{ $t("gcashAccount.export") }}</a-button>
      </div>
      <TableComponents :data-list="transactionRecordsList" :columns="transactionRecordsColumns" />
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import type { TableColumnsType } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import { gcashAccountList, transferList } from "@/api/query.api";
import { getUserInfo } from "@/utils/storage/auth";
import TableComponents from "@/components/Table/index.vue";
const open = ref<boolean>(false);
const accountList = ref([]);
const transactionRecordsList = ref([]);
onMounted(() => {
  getList();
});
interface Params {
  pageNo: number;
  pageSize: number;
  // phone: string;
}
const userInfo = getUserInfo();
const params = reactive<Params>({
  pageNo: 1,
  pageSize: 8,
  // phone: userInfo ? userInfo.mobile : "",
});

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
  const data = {
    phone: record.msisdn,
  };
  await transferList(data).then((res) => {
    open.value = true;
    console.log(res);
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
  { title: "transactionRecordsId", dataIndex: "transactionRecordsId", key: "8" },
  { title: "transferLogsJson", dataIndex: "transferLogsJson", key: "9" },
];
</script>
<style lang="scss" scoped>
.modal-body {
  padding: 10px;
}
</style>
