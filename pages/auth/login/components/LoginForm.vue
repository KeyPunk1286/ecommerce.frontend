<template>
  <div class="login__form">
    <LoginFormField
        label="Email"
        type="text"
        placeholder="Enter your email"
        :value="formData.email"
        :errorFormData="errorsFormData.email"
        @input="handleInputEmail"
        @focus="handleFocusEmail"
        @blur="handleBlurEmail"
    />
    <LoginFormField
        label="Password"
        type="text"
        placeholder="Enter your password"
        :value="formData.password"
        :errorFormData="errorsFormData.password"
        @input="handleInputPassword"
        @focus="handleFocusPassword"
        @blur="handleBlurPassword"

    />
    <LoginFormSubmit @submit="handleSubmitForm" />
  </div>
</template>

<script setup>
import LoginFormField from "~/pages/auth/login/components/LoginFormField.vue";
import LoginFormSubmit from "~/pages/auth/login/components/LoginFormSubmit.vue";

import {
  formData,
  errorsFormData
} from "~/pages/auth/login/composables/data.js";

import {
  doValidateForm,
  isEmailValid,
  isPasswordValid,
  isFormValid,
} from "~/pages/auth/login/composables/validation.js";

// Тут у нас починається блок де будуть функції
// які відповідають за валідацію та заповнення
// полів в formData та errorsFormData

// Блок функцій для поля email
const handleFocusEmail = () => {
  isEmailValid(formData.email, errorsFormData.email);
}
const handleInputEmail = (event) => {
  formData.email = event.target.value;
  isEmailValid(formData.email, errorsFormData.email);
}
const handleBlurEmail = () => {
  isEmailValid(formData.email, errorsFormData.email);
}
// Кінець блоку функцій для поля email

// Блок функцій для поля password
const handleFocusPassword = () => {
  isPasswordValid(formData.password, errorsFormData.password);
}
const handleInputPassword = (event) => {
  formData.password = event.target.value;
  isPasswordValid(formData.password, errorsFormData.password);
}
const handleBlurPassword = () => {
  isPasswordValid(formData.password, errorsFormData.password);
}
// Кінець блоку функцій для поля password

const handleSubmitForm = () => {
  // 1. Запускаємо функцію яка просто запустить перевірку кожно поля форми
  doValidateForm();

  // 2. Перевіряємо чи форма валідна
  // - - Якщо форма валідна -> Відправляємо запит на сервер на авторизацію
  if (isFormValid(errorsFormData)) {
    // Тут самого запиту поки що немає - пізніше напишемо
    alert('ОТПРАВЛЯЄМ ЗАПРОС НА СЕРВЕР НА АВТОРИЗАЦІЮ');
  }
}
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