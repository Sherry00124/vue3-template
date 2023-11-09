<template>
  <Transition>
    <a-config-provider
      :locale="locale === 'en' ? enUS : zhCN"
      :theme="{
        token: {
          colorPrimary: '#259C77',
        },
      }"
    >
      <router-view v-if="currentRoute.name == 'login'" />

      <Display v-else />
    </a-config-provider>
  </Transition>
</template>
<script lang="ts" setup>
import Display from "@/layout/index.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const currentRoute = useRoute();

import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";

const locale = ref(store.state.langModule.currentLang.lang);
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
