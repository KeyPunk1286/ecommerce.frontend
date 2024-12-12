import {
  errorsFormData,
  formData,
} from "~/pages/auth/login/composables/data.js";
import { computed } from "vue";

// Validation Rules - в цьому блоку написані різні валідаціїні правила

export const isEmailValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  // isRequired
  if (value.length < 1) {
    errorData.errors = ["Field Email is required!"];
    return false;
  }

  // isEmail
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    errorData.errors = ["Invalid email format!"];
    return false;
  }

  return true;
};

export const isPasswordValid = (value, errorData) => {
  errorData.isDirty = true;
  errorData.errors = [];

  // isRequired
  if (value.length < 1) {
    errorData.errors = ["Field Password is required!"];
    return false;
  }

  // Min length should be not less than 6
  if (value.length < 6) {
    errorData.errors = ["Field Password min length should be not less than 6"];
    return false;
  }

  // Max length should be not more than 20
  if (value.length > 20) {
    errorData.errors = ["Field Password should be not more than 20"];
    return false;
  }

  return true;
};

// Methods - в цьому блоці написані різні валідаціїні функції

export const doValidateForm = () => {
  isEmailValid(formData.email, errorsFormData.email);
  isPasswordValid(formData.password, errorsFormData.password);
};

export const isFormValid = (errorsFormData) => {
  // Тут ми пробігаємось по кожному ключу з errorsFormData і перевіряємо чи є в полі errors хоч одна помилка
  return Object.values(errorsFormData).every(
    (field) => field.errors.length === 0
  );
};

// Computed - в цьому блоці написані різні computed властівості

export const isFormValidComputed = computed(() => {
  // Тут теж саме що і в функції isFormValid на 60-й строці
  return Object.values(errorsFormData).every(
    (field) => field.errors.length === 0
  );
});
