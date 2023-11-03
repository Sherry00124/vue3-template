<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view v-if="currentRoute.name == 'login'" />

  <Display v-else />
</template>
<script lang="ts" setup>
import Display from "@/components/Display.vue";
import { useRoute } from "vue-router";

const currentRoute = useRoute();
console.log(currentRoute);
</script>
