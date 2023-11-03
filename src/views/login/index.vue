<template>
  <div class="container color-baf">
    <div class="form flex-column-center">
      <h1>{{ $t("login.title") }}</h1>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          :label="$t('login.username')"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          :label="$t('login.password')"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item
          :label="$t('login.verification')"
          name="verification"
          :rules="[{ required: true, message: 'Please input your verification!' }]"
        >
          <a-input v-model:value="formState.verification">
            <template #suffix> 123 </template>
          </a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" @click="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { reactive } from "vue";

interface FormState {
  username: string;
  password: string;
  verification: string;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  verification: "",
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const submit = () => {
  router.push("/");
};
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
