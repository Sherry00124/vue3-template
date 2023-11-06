<template>
  <div class="flex-column-center container">
    <div v-if="props.dataList.length == 0">
      <a-empty />
    </div>
    <div v-else>
      <a-table
        :columns="props.columns"
        :data-source="props.dataList"
        :scroll="{ x: 1400 }"
        :pagination="{ defaultPageSize: params.pageSize }"
        @change="handlePageChange"
      >
      </a-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  },
  columns: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["changePage"]);

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

const handlePageChange = (e: any) => {
  emit("changePage", e);
};
</script>
