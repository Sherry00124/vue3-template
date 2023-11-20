<template>
  <div class="loading" v-show="visible">
    <div class="loader-cogs">
      <LoadingOutlined />
      <span>Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "Loading",
  setup() {
    // 控制组件的状态
    let visible = ref(false);

    // 显示组件
    let showLoading = () => {
      visible.value = true;
    };
    // 隐藏组件
    let hideLoading = () => {
      visible.value = false;
    };

    return { visible, showLoading, hideLoading };
  },
});
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  inset: 0;
  z-index: 9999;
  margin: auto;
  background-color: #7f7d7db9;

  .loader-cogs {
    position: absolute;
    top: -20px !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -2;
    margin: auto;
    width: 100px;
    height: 100px;
    // position: relative;
  }
}
</style>
