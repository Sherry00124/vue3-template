<template>
  <div>
    <a-menu
      id="dddddd"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :items="items"
      @click="handleClick"
      theme="dark"
    ></a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h, computed, Component } from "vue";
import type { MenuProps, ItemType } from "ant-design-vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import router from "@/router/index";
import { useRoute } from "vue-router";

const allRoutes = ref(router.options.routes);
const currentRoute = useRoute();
const selectedKeys = ref<string[]>();
const openKeys = ref<string[]>(["sub1"]);
selectedKeys.value = [currentRoute.name as string];

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: "group"
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items = computed(() => {
  return allRoutes.value.map((route) => {
    if (!route.meta?.hidden) {
      return getItem(route.meta?.title as string, route.name as string, () =>
        h((route.meta?.icon as Component) || AppstoreOutlined)
      );
    }
  });
});

const handleClick: MenuProps["onClick"] = (e) => {
  selectedKeys.value = [e.key as string];
  router.push(e.key as string);
};

// 在路由变化时，更新选中菜单项
watch(
  () => currentRoute.path,
  (newPath) => {
    const matchedMenuKey = getMenuKeyByRoutePath(newPath);
    selectedKeys.value = [matchedMenuKey];
    openKeys.value = [matchedMenuKey];
  }
);

function getMenuKeyByRoutePath(path: string): string {
  const matchedRoute = allRoutes.value.find((route) => {
    return path.startsWith(route.path);
  });
  return matchedRoute ? (matchedRoute.name as string) : "";
}
</script>
