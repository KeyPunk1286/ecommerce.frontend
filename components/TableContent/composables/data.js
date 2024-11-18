import { reactive } from "vue";

//data for new user ===========================
export const dataNewUser = reactive({
  email: "",
  firstname: "",
  secondname: "",
  lastname: "",
  password: "",
  rePassword: "",
});

export const errorsFromNewUser = reactive({
  email: {
    isDirty: false,
    errors: [],
  },
  firstname: {
    isDirty: false,
    errors: [],
  },
  secondname: {
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

// data for new Shop =========================
export const dataNewShop = reactive({
  customer_id: "",
  title: "",
});

export const errorsFromNewShop = reactive({
  customer_id: {
    isDirty: false,
    errors: [],
  },
  title: {
    isDirty: false,
    errors: [],
  },
});

// data for new Customer =======================
export const dataNewCustomer = reactive({
  title: "",
  user_id: "",
  status: "",
});

export const errorsFromNewCustomer = reactive({
  title: {
    isDirty: false,
    errors: [],
  },
  user_id: {
    isDirty: false,
    errors: [],
  },
  status: {
    isDirty: false,
    errors: [],
  },
});
