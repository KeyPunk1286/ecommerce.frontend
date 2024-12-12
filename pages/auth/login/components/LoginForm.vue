<template>
  <div class="login__form">
    <LoginFormField
      label="Email"
      type="text"
      placeholder="Enter your email"
      :value="formData.email"
      :errorFormData="errorsFormData.email"
      @input="handleInput($event, 'email', isEmailValid, 'email')"
      @focus="handleFocus('email', isEmailValid, 'email')"
      @blur="handleBlur('email', isEmailValid, 'email')"
    />
    <LoginFormField
      label="Password"
      type="password"
      placeholder="Enter your password"
      :value="formData.password"
      :errorFormData="errorsFormData.password"
      @input="handleInput($event, 'password', isPasswordValid, 'password')"
      @focus="handleFocus('password', isPasswordValid, 'password')"
      @blur="handleBlur('password', isPasswordValid, 'password')"
    />
    <LoginFormSubmit @submit="handleSubmitForm" />
  </div>
</template>

<script setup>
import LoginFormField from "~/pages/auth/login/components/LoginFormField.vue";
import LoginFormSubmit from "~/pages/auth/login/components/LoginFormSubmit.vue";

import {
  formData,
  errorsFormData,
} from "~/pages/auth/login/composables/data.js";

import {
  doValidateForm,
  isEmailValid,
  isPasswordValid,
  isFormValid,
} from "~/pages/auth/login/composables/validation.js";

import axios from "axios";
import useLocalStorage from "~/composables/useLocalStorage.js";

import { ACCESS_TOKEN_STORAGE_KEY } from "~/constants/global.js";
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";

const router = useRouter();

const validateField = (dataName, validate, errorFieldName) => {
  validate(formData[dataName], errorsFormData[errorFieldName]);
};

const handleInput = (event, dataName, validate, errorFieldName) => {
  formData[dataName] = event.target.value;
  validateField(dataName, validate, errorFieldName);
};
const handleFocus = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};
const handleBlur = (dataName, validate, errorFieldName) => {
  validateField(dataName, validate, errorFieldName);
};

const doLoginUser = async (data = {}) => {
  return await axios.post("http://localhost:8888/auth/login", data);
};

const handleSubmitForm = async () => {
  doValidateForm();

  if (isFormValid(errorsFormData)) {
    try {
      const dataThatWillSend = {
        email: formData.email,
        password: formData.password,
      };

      const response = await doLoginUser(dataThatWillSend);

      const token = response?.data?.token;

      const localStorage = useLocalStorage();
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);

      const authStore = useAuthStore();
      authStore.setAccessToken(token);

      await router.push("/");
    } catch (e) {
      const status = e?.response?.status;
      const message = e?.response?.data?.message || e?.response?.data?.error;
      const resDataErrors = e?.response?.data?.errors;
      if (status === 401) {
        if (message) {
          toast.error(message);
        }
        if (resDataErrors) {
          Object.entries(resDataErrors).forEach(([key, errorMessage]) => {
            if (errorsFormData[key] !== undefined) {
              errorsFormData[key].isDirty = true;
              errorsFormData[key].errors = errorMessage;
            }
          });
        }
      } else {
        toast.error(message || "An unexpected error occurred.");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  &__form {
    border: 1px solid #05008b;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>
