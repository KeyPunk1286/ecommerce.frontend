<template>
  <div class="login">

    <div class="login__title">{{pageName}} page</div>

    <div class="login__form">

      <div class="login__form__field">
        <div class="login__form__field-label">Email</div>
        <div class="login__form__field-input">
          <UiInput
              placeholder="Enter your email"
              :value="formData.email"
              @input="handleInputEmail"
              @focus="handleFocusEmail"
              @blur="handleBlurEmail"
          />
        </div>
        <div class="login__form__field-error" v-for="error in errorsFormData.email.errors" :key="error">
          {{ error }}
        </div>
      </div>

      <div class="login__form__field">
        <div class="login__form__field-label">Password</div>
        <div class="login__form__field-input">
          <UiInput
              type="password"
              placeholder="Enter you password"
              :value="formData.password"
              @input="handleInputPassword"
              @focus="handleFocusPassword"
              @blur="handleBlurPassword"
          />
        </div>
        <div class="login__form__field-error" v-for="error in errorsFormData.password.errors" :key="error">
          {{ error }}
        </div>
      </div>

      <button class="login__form__submit"
              :class="{'login__form__submit--disabled': !isFormValidComputed}"
              @click="handleSubmitForm"
              :disabled="!isFormValidComputed"
      >
        Login
      </button>

    </div>
  </div>
</template>

<script setup>
import {
  pageName,
  formData,
  errorsFormData
} from "~/pages/auth/login/composables/data.js";

import {
  doValidateForm,
  isEmailValid,
  isPasswordValid,
  isFormValid,
  isFormValidComputed,
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);

  &__title {
    margin-bottom: 20px;
    font-size: 24px;
    text-transform: uppercase;
  }

  &__form {
    border: 1px solid #05008b;
    padding: 20px;
    border-radius: 10px;

    &__field {
      width: 100%;
      position: relative;
      margin-bottom: 20px;

      &-label {
        position: absolute;
        left: 5px;
        top: -10px;
      }

      &-input {
        input {
          border: 1px solid #00138b;
          border-radius: 10px;
          min-width: 400px;
          padding: 0 10px;

          width: 100%;
          background-color: transparent;
          height: 60px;
          color: gainsboro;

          &:focus {
            outline: none;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }

      &-error {
        color: red;
        font-size: 13px;
        padding: 5px 0;
      }
    }

    &__submit {
      background-color: #0e0f50;
      color: gainsboro;
      width: 100%;
      height: 60px;
      border: none;
      border-radius: 10px;

      &:active {
        background-color: #0e1256;
      }

      &--disabled {
        background-color: #05071c;
        color: #383636;
      }
    }
  }
}
</style>