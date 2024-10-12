import { reactive } from "vue";

export const registrationForm = reactive({
  username: "",
  login: "",
  password: "",
  rePassword: "",
});

export const errorsFromRegistrationData = reactive({
  username: {
    isDirty: false,
    errors: [],
  },
  login: {
    isDirty: false,
    errors: [],
  },
  password: {
    isDirty: false,
    errors: [],
  },
  rePassword: {
    isDirty: false,
    errors: [],
  },
});
