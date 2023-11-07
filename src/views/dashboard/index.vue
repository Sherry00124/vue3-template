<template>
  <div class="home">
    <div class="flex-column-center home-text">
      <div class="flex-row-cx">
        <span class="home-text-title">Effective Amount</span>
        <EyeOutlined
          class="icon-large"
          v-if="showAmount"
          @click="() => (showAmount = !showAmount)"
        />
        <EyeInvisibleOutlined class="icon-large" v-else @click="() => (showAmount = !showAmount)" />
      </div>
      <div class="flex-row-cx">
        <span class="home-text-content">{{ showAmount ? effectiveAmount : "******" }}</span>
        <span v-show="showAmount" style="color: blue">USDT</span>
      </div>
      <div class="flex-between home-btn">
        <a-button @click="() => router.push('/deposit')" type="primary">
          <template #icon>
            <DownloadOutlined />
          </template>
          {{ $t("dashboard.deposit") }}</a-button
        >
        <a-button @click="() => router.push('/transaction')">
          <template #icon>
            <FileSearchOutlined />
          </template>
          {{ $t("dashboard.details") }}</a-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  FileSearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import { ref, computed, onMounted, watch } from "vue";
import router from "@/router";

const store = useStore();
var effectiveAmount = ref(store.state.user.userInfo.effectiveAmount);

watch(
  () => store.state.user.userInfo.effectiveAmount,
  (newAmount, oldAmount) => {
    effectiveAmount.value = newAmount;
  }
);

onMounted(() => {
  try {
    store.dispatch("user/getMerchantInfo");
  } catch (error) {
    console.error(error);
  }
});
var showAmount = ref<Boolean>(false);
</script>

<style lang="scss" scoped>
.home {
  &-text {
    &-title {
      font-size: 30px;
      margin-right: 5px;
    }
    &-content {
      font-size: 40px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
  &-btn {
    margin-top: 10px;
    width: 30%;
    font-size: 30px;
  }
}
</style>
