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
  status: "active",
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

//data for new Product ========================
export const dataNewProduct = reactive({
  title: "",
  shop_id: "",
  description: "",
  price: "",
});

export const errorsFromNewProduct = reactive({
  title: {
    isDirty: false,
    errors: [],
  },
  shop_id: {
    isDirty: false,
    errors: [],
  },
  description: {
    isDirty: false,
    errors: [],
  },
  price: {
    isDirty: false,
    errors: [],
  },
});
