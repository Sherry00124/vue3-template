<template>
  <div class="flex-center-xy header">
    <div class="flex-row header-left">
      <MenuUnfoldOutlined
        :style="{ fontSize: 25 + 'px' }"
        @click="toggleSidebar"
        v-if="showSidebar"
      />
      <MenuFoldOutlined :style="{ fontSize: 25 + 'px' }" @click="toggleSidebar" v-else />
      <!-- <a-page-header :breadcrumb="{ routes }" /> -->
    </div>
    <div class="flex-row header-right">
      <a-menu mode="horizontal" :items="items" @click="handleClick" :selectable="false" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getUserInfo } from "@/utils/storage/auth";
import { useStore } from "vuex";
import type { MenuProps } from "ant-design-vue";
import router from "@/router/index";
const allRoutes = ref(router.options.routes);
import {
  SmileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FontColorsOutlined,
} from "@ant-design/icons-vue";
import { computed, ref, h } from "vue";
import { useI18n } from "vue-i18n";

const store = useStore();

const username = computed(() => {
  const userInfo = store.state.user.userInfo;
  return userInfo ? userInfo.mobile : "";
});

const showSidebar = computed(() => {
  return store.state.appModule.sidebar.opened;
});
// const breadcrumb = computed(() => {
//   var breadcrumbArray: any = [];
//   allRoutes.value.map((element: any) => {
//     breadcrumbArray.push({ path: element.path, breadcrumbName: element.meta.title });
//   });
//   return breadcrumbArray;
// });
// console.log(username);
// console.log(breadcrumb);

const toggleSidebar = () => {
  store.dispatch("appModule/toggleSideBar");
};

const handleClick = (e: any) => {
  switch (e.key) {
    case "chinese":
      store.dispatch("langModule/toggleLang", "cn");
      break;
    case "english":
      store.dispatch("langModule/toggleLang", "en");
      break;
    case "logout":
      store.dispatch("user/logout");
      router.push("/login");
      break;
  }
};

const items = ref<MenuProps["items"]>([
  {
    key: "lang",
    icon: () => h(FontColorsOutlined),
    children: [
      {
        label: useI18n().t("layout.ch"),
        key: "chinese",
      },
      {
        label: useI18n().t("layout.en"),
        key: "english",
      },
    ],
  },
  {
    key: "app",
    icon: () => h(SmileOutlined),
    label: username,
    children: [
      {
        label: useI18n().t("layout.logout"),
        key: "logout",
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
    }
  }
}
</style>
