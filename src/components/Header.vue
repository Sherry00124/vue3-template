<template>
  <div class="flex-center-xy header">
    <div class="flex-row header-left">
      <MenuUnfoldOutlined
        :style="{ fontSize: 25 + 'px' }"
        @click="toggleSidebar"
        v-if="showSidebar"
      />
      <MenuFoldOutlined :style="{ fontSize: 25 + 'px' }" @click="toggleSidebar" v-else />
    </div>
    <div class="flex-row header-right">
      <!-- {{ username }} -->
      <FontColorsOutlined :style="{ fontSize: 25 + 'px' }" />
      <smile-outlined :style="{ fontSize: 25 + 'px' }" class="header-right-icon" />
      <span class="header-right-text">{{ username }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getUserInfo } from "@/utils/storage/auth";
import { useStore } from "vuex";
const store = useStore();
import {
  SmileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FontColorsOutlined,
} from "@ant-design/icons-vue";
import { computed } from "vue";

const username = computed(() => {
  const userInfo = getUserInfo();
  return userInfo ? userInfo.mobile : ""; // 使用条件运算符处理可能为 null 的情况
});

const showSidebar = computed(() => {
  return store.state.appModule.sidebar.opened; // 使用条件运算符处理可能为 null 的情况
});

const toggleSidebar = () => {
  store.dispatch("appModule/toggleSideBar");
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  text-align: right;
  justify-content: space-between;
  &-left {
    margin-left: 1rem;
  }
  &-right {
    margin-right: 1rem;
    align-items: center;
    &-icon {
      margin-right: 0.5rem;
    }
    &-text {
      font-size: 20px;
      // color: #24a6f2;
    }
  }
}
</style>
