<template>
  <div>
    <a-menu
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
import { ref, watch, VueElement, h, computed, Component } from "vue";
import type { MenuProps, ItemType } from "ant-design-vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import router from "@/router/index";
import { useRoute } from "vue-router";

const allRoutes = ref(router.options.routes);
const currentRoute = useRoute();
const selectedKeys = ref<string[]>();
const openKeys = ref<string[]>(["sub1"]);
console.log(currentRoute);
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
      if (route.children && route.children.length > 1) {
        // If the route has more than one child, create a nested structure
        const nestedChildren = route.children.map((childRoute) =>
          getItem(childRoute.meta?.title as string, childRoute.name as string, () =>
            h((childRoute.meta?.icon as Component) || AppstoreOutlined)
          )
        );

        return getItem(
          route.meta?.title as string,
          route.name as string,
          h((route.meta?.icon as Component) || AppstoreOutlined),
          nestedChildren,
          "group"
        );
      } else if (route.children && route.children.length === 1) {
        return getItem(
          route.children[0]?.meta?.title as string,
          route.children[0]?.name as string,
          h((route.children[0]?.meta?.icon as Component) || AppstoreOutlined)
        );
      } else {
        // If there are no children, create a regular item without children
        return getItem(
          route.meta?.title as string,
          route.name as string,
          h((route.meta?.icon as Component) || AppstoreOutlined)
        );
      }
    }
  });
});

const handleClick: MenuProps["onClick"] = (e) => {
  selectedKeys.value = [e.key as string];
  router.push("/" + (e.key as string));
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
console.log(items);
function getMenuKeyByRoutePath(path: string): string {
  const matchedRoute = allRoutes.value.find((route) => {
    return path.startsWith(route.path);
  });
  return matchedRoute ? (matchedRoute.name as string) : "";
}
</script>
