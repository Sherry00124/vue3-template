<template>
  <div class="flex-center-xy header">
    <div class="flex-row">
      <MenuUnfoldOutlined />
      <MenuFoldOutlined />
    </div>
    <div class="flex-row">
      <!-- {{ username }} -->
      <smile-outlined />
      <span>{{ username }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getUserInfo } from "@/utils/auth";
import { SmileOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";

const username = computed(() => {
  const userInfo = getUserInfo();
  return userInfo ? userInfo.mobile : ""; // 使用条件运算符处理可能为 null 的情况
});
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  text-align: right;
  justify-content: space-between;
}
</style>
