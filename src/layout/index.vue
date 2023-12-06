<template>
  <div class="home">
    <a-layout>
      <a-layout-sider :trigger="null" v-model:collapsed="collapsed" collapsible>
        <div class="logo flex-center-xy">
          <img alt="" width="40" src="@/assets/logo.webp" class="logo-img" />
          <span v-show="!collapsed">{{ $t("layout.title") }}</span>
        </div>
        <NavBar />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <Header />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '16px 16px',
            padding: '16px',
            background: '#fff',
            minHeight: 'calc(100vh - 100px)',
          }"
        >
          <router-view :key="key"></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import Header from "@/components/Header.vue";
import { reactive, ref, watch, VueElement, h, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const currentRoute = useRoute();

const store = useStore();

var collapsed = ref<Boolean>(store.state.appModule.sidebar.opened);

// const collapsible = ref<Boolean>();
watch(
  () => store.state.appModule.sidebar.opened,
  (newSidebar, oldSidebar) => {
    collapsed.value = newSidebar;
  }
);

const key = computed(() => {
  return currentRoute.path;
});
</script>
<style scoped lang="scss">
.logo {
  padding: 15px;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  &-img {
    margin-right: 5px;
  }
}
</style>
