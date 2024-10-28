import { reactive } from "vue";

export const registrationForm = reactive({
  email: "",
  firstName: "",
  secondName: "",
  lastname: "",
  password: "",
  rePassword: "",
});

export const errorsFromRegistrationData = reactive({
  email: {
    isDirty: false,
    errors: [],
  },
  firstName: {
    isDirty: false,
    errors: [],
  },
  secondName: {
    isDirty: false,
    errors: [],
  },
  lastname: {
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
