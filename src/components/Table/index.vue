<template>
  <div class="container">
    <div class="container-btn">
      <a-button shape="circle" :icon="h(RedoOutlined)" @click="refreshPage" />
    </div>
    <!-- <a-spin :spinning="spinning"> -->
    <a-table
      :columns="props.columns"
      :data-source="props.dataList"
      :pagination="{ pageSize: page.pageSize, total: page.total, current: page.pageNo }"
      @change="handlePageChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'tags'">
          <a-tag color="green">
            {{ column.dataIndex }}
          </a-tag>
        </template>
        <template v-if="column.key === 'operation'">
          <a-popconfirm
            :title="$t('table.queryConfirm')"
            ok-text="Yes"
            cancel-text="No"
            @confirm="tableAction(record)"
          >
            <a href="#">{{ column.dataIndex }}</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <!-- </a-spin> -->
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, h } from "vue";
import { RedoOutlined } from "@ant-design/icons-vue";
const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  },
  columns: {
    type: Array,
    default: [],
  },
  page: {
    type: Object,
    default: [],
  },
});
const emit = defineEmits(["changePage", "refresh", "tableAction"]);
const spinning = ref<Boolean>(false);
/**
 *
 * @param e 分页
 */
const handlePageChange = (e: any) => {
  spinning.value = true;
  emit("changePage", e);
};
/**
 * 页面刷新
 */
const refreshPage = () => {
  emit("refresh");
};
/**
 * 表格操作
 */

const tableAction = (record: any) => {
  emit("tableAction", record);
};
</script>
<style lang="scss" scoped>
.container {
  &-btn {
    margin: 10px;
    text-align: right;
  }
}
</style>
