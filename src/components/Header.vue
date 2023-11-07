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
      <a-menu mode="horizontal" :items="items" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getUserInfo } from "@/utils/storage/auth";
import { useStore } from "vuex";
import type {MenuProps} from 'ant-design-vue'
const store = useStore();
import {
  SmileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FontColorsOutlined,
} from "@ant-design/icons-vue";
import { computed, ref, h } from "vue";
import { useI18n } from "vue-i18n";
const username = computed(() => {
  const userInfo = getUserInfo();
  return userInfo ? userInfo.institution : ""; // 使用条件运算符处理可能为 null 的情况
});

const showSidebar = computed(() => {
  return store.state.appModule.sidebar.opened; // 使用条件运算符处理可能为 null 的情况
});

const toggleSidebar = () => {
  store.dispatch("appModule/toggleSideBar");
};

const current = ref<string[]>(["mail"]);
const items = ref<MenuProps["items"]>([
  {
    key: "sub1",
    icon: () => h(FontColorsOutlined),
    children: [
      {
        label: useI18n().t("layout.ch"),
        key: "setting:1",
      },
      {
        label: useI18n().t("layout.en"),
        key: "setting:2",
      },
    ],
  },
  {
    key: "app",
    icon: () => h(SmileOutlined),
    label: username,
    title: username,
    children: [
      {
        label: useI18n().t("layout.logout"),
        key: "setting:2",
      },
    ],
  },
]);
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
