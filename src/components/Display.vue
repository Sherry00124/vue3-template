<template>
    <div class="home">
      <a-layout>
        <a-layout-sider :trigger="null" collapsible>
          <div class="logo" />
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
  </script>
  <style scoped>
  .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(55, 45, 45, 0.3);
  }
  </style>
  