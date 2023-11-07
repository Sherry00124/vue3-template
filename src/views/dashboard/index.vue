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
      <span class="home-text-content">{{ showAmount ? effectiveAmount : "******" }}</span>
      <div class="flex-row-cx home-btn">
        <a-button>Deposit</a-button>
        <a-button @click="() => router.push('/transaction')">TransactionDetails</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";
import { ref, computed, onMounted, watch } from "vue";
import router from "@/router";

const store = useStore();
var effectiveAmount = ref(store.state.user.userInfo.effectiveAmount);

watch(
  () => store.state.user.userInfo.effectiveAmount,
  (newSidebar, oldSidebar) => {
    effectiveAmount.value = newSidebar;
    console.log(123);
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
      font-size: 40px;
      margin-right: 5px;
    }
    &-content {
      font-size: 50px;
      font-weight: bold;
    }
  }
  &-btn {
    margin-top: 10px;
  }
}
</style>
