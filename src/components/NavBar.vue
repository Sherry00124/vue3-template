<template>
  <div>
    <a-menu
      id="dddddd"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :items="items"
      @click="handleClick"
    ></a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h, computed } from "vue";
import type { MenuProps, ItemType } from "ant-design-vue";
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
      return getItem(route.meta?.title as string, route.name as string); // 假设路由元数据中有 title 和 name
    }
  });
});

const handleClick: MenuProps["onClick"] = (e) => {
  selectedKeys.value = [e.key as string];
  router.push(e.key);
};

// 在路由变化时，更新选中菜单项
// watch(() => router.path, (newPath) => {
//   const matchedMenuKey = getMenuKeyByRoutePath(newPath);
//   selectedKeys.value = [matchedMenuKey];
//   openKeys.value = [matchedMenuKey];
// });

// function getMenuKeyByRoutePath(path: string): string {
//   // 这里根据路由路径映射到菜单项的 key，实际根据你的路由结构来定义
//   const matchedRoute = allRoutes.value.find((route) => {
//     return path.startsWith(route.path);
//   });
//   return matchedRoute ? matchedRoute.name : ""; // 返回路由的名称作为 key
// }
</script>
