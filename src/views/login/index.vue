<template>
  <div class="container" :style="{ backgroundColor: token.colorPrimary }">
    <div class="form flex-column-center">
      <h1>{{ $t("login.title") }}</h1>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          :label="$t('login.mobile')"
          name="mobile"
          :rules="[{ required: true, message: 'Please input your mobile!' }]"
        >
          <a-input v-model:value="formState.mobile"> </a-input>
        </a-form-item>

        <a-form-item
          :label="$t('login.password')"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password"> </a-input-password>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">{{ $t("login.title") }}</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { reactive, onMounted, ref, computed } from "vue";
import { verification } from "@/api/login.api";
import { useStore } from "vuex";
import { theme } from "ant-design-vue";
import { MobileOutlined } from "@ant-design/icons-vue";
const { useToken } = theme;
const { token } = useToken();

interface FormState {
  mobile: string;
  password: string;
}

const formState = reactive<FormState>({
  mobile: "1234567890",
  password: "123456",
});

const store = useStore();

async function onFinish(values: any) {
  try {
    let data = {
      ...formState,
    };
    await store.dispatch("user/login", data);
    try {
      await store.dispatch("user/getMerchantInfo");
      try {
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
}
.form {
  background-color: #ffffff;

  border-radius: 16px;
  padding: 30px;
}
</style>
