import { message } from 'ant-design-vue'; import { useI18n } from 'vue-i18n'; import { getUserInfo }
from '@/utils/storage/auth'; import userModule from '@/store/modules/user'; import { useStore } from
'vuex';
<template>
  <div class="flex-column container">
    <a-alert :message="$t('deposit.message')" banner />
    <div class="flex-row deposit-body">
      <div class="deposit-form">
        <a-form
          :model="formState"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
          :rules="rules"
          @finish="onFinish"
        >
          <a-form-item :label="$t('deposit.address')" name="address">
            <a-input-group compact>
              <a-input
                v-model:value="formState.address"
                style="width: calc(100% - 200px)"
                disabled
              />
              <a-button>
                <template #icon><CopyOutlined /></template>
              </a-button>
            </a-input-group>
          </a-form-item>

          <a-form-item :label="$t('deposit.amount')" name="amount">
            <a-input v-model:value="formState.amount" style="width: calc(100% - 200px)" />
          </a-form-item>
          <a-form-item :label="$t('deposit.txid')" name="txId">
            <a-input v-model:value="formState.txId" style="width: calc(100% - 200px)" />
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">{{ $t("deposit.submit") }}</a-button>
          </a-form-item>
        </a-form>
      </div>
      <img src="@/assets/txid.png" width="300" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { CopyOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import type { Rule } from "ant-design-vue/es/form";
import { useI18n } from "vue-i18n";
import { deposit } from "@/api/deposit.api";
import router from "@/router";
import { message } from "ant-design-vue";
const store = useStore();
interface FormState {
  address: string;
  txId: string;
  amount: string;
}

const formState = reactive<FormState>({
  address: store.state.user.userInfo.topUpAddress,
  txId: "",
  amount: "",
});
const validateAmount = (rule, value, callback) => {
  const regex = /^\d+(\.\d{1,2})?$/;
  if (!regex.test(value)) {
    callback(new Error("Amount must have up to 2 decimal places"));
  } else {
    callback();
  }
};
const validateTxId = (rule, value, callback) => {
  // 定义只包含字母和数字的正则表达式
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(value)) {
    callback(new Error("TxId is not valid"));
  } else {
    callback();
  }
};
const rules: Record<string, Rule[]> = {
  amount: [
    {
      required: true,
      message: useI18n().t("deposit.validateAmount"),
      validator: validateAmount,
      trigger: ["change", "blur"],
    },
  ],
  txId: [
    {
      required: true,
      message: useI18n().t("deposit.validateTxId"),
      validator: validateTxId,
      trigger: ["change", "blur"],
    },
  ],
};

const onFinish = (values: any) => {
  deposit(values).then((res) => {
    message.success(res.message);
    // router.push('/index')
  });
};
</script>

<style lang="scss" scoped>
.deposit-form {
  width: 70%;
}
</style>
