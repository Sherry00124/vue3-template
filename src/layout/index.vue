<template>
  <div class="home">
    <a-layout>
      <a-layout-sider :trigger="null" v-model:collapsed="collapsed" collapsible>
        <div class="logo flex-center-xy">
          <img alt="" width="40" src="@/assets/logo.png" class="logo-img" />
          <span v-show="!collapsed">{{ $t("layout.title") }}</span>
        </div>
        <NavBar />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <Header />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '580px' }"
        >
          <router-view></router-view>
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
const store = useStore();

var collapsed = ref<Boolean>(store.state.appModule.sidebar.opened);

// const collapsible = ref<Boolean>();
watch(
  () => store.state.appModule.sidebar.opened,
  (newSidebar, oldSidebar) => {
    collapsed.value = newSidebar;
    console.log(collapsed.value);
  }
);
</script>
<style scoped lang="scss">
.logo {
  padding: 15px;
  background: rgba(55, 45, 45, 0.3);
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  &-img {
    margin-right: 5px;
  }
}
</style>
