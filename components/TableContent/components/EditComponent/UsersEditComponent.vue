<template>
  <div class="user-edit">
    <div class="user-edit__panel-title">
      Edit user: <span>{{ user.email }}</span>
    </div>
    <div class="user-edit__panel-main">
      <UiField label="Email" :errorsFromData="errorsFromNewUser.email">
        <UiInput
          type="text"
          placeholder="enter email"
          :value="user.email"
          @input="handleImputEmail"
          @focus="handleFocusEmail"
          @blur="handleBlurEmail"
        />
      </UiField>
      <UiField label="Firstname" :errorsFromData="errorsFromNewUser.firstname">
        <UiInput
          type="text"
          placeholder="enter firstname"
          :value="user.firstname"
          @input="handleImputFirstname"
          @focus="handleFocusFirstname"
          @blur="handleBlurFirstname"
        />
      </UiField>
      <UiField
        label="Secondname"
        :errorsFromData="errorsFromNewUser.secondname"
      >
        <UiInput
          type="text"
          placeholder="enter secondname"
          :value="user.secondname"
          @input="handleImputSecondname"
          @focus="handleFocusSecondname"
          @blur="handleBlurSecondname"
        />
      </UiField>
      <UiField label="lastname" :errorsFromData="errorsFromNewUser.lastname">
        <UiInput
          type="text"
          placeholder="enter lastname"
          :value="user.lastname"
          @input="handleImputLastname"
          @focus="handleFocusLastname"
          @blur="handleBlurLastname"
        />
      </UiField>
    </div>

    <div class="user-edit__button-panel button-panel">
      <button class="button-panel__click-back" @click="handleClickGoBack">
        <i class="fa-solid fa-backward"></i> Back
      </button>
      <button class="button-panel__click-save" @click="handleSaveChanges">
        <i class="fa-regular fa-floppy-disk"></i>
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { errorsFromNewUser } from "@/components/TableContent/composables/data.js";
import {
  isEmailValid,
  isFirstNameValid,
  isSecondnameValid,
  isLastnameValid,
  doValidateErrorForm,
  isNewUserFormValid,
} from "@/components/TableContent/composables/validationForNewUser.js";

const props = defineProps({
  selectId: {
    type: Number,
    required: true,
  },
});

const user = ref({});

const loadDataById = async () => {
  try {
    const userData = await axios.get(
      `http://localhost:8888/users/${props.selectId}`
    );
    user.value = userData?.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

//email field ===================================================
const handleImputEmail = (event) => {
  user.value.email = event.target.value;
  isEmailValid(user.value.email, errorsFromNewUser.email);
};
const handleFocusEmail = () => {
  isEmailValid(user.value.email, errorsFromNewUser.email);
};
const handleBlurEmail = () => {
  isEmailValid(user.value.email, errorsFromNewUser.email);
};
//firstname field ================================================
const handleImputFirstname = (event) => {
  user.value.firstname = event.target.value;
  isFirstNameValid(user.value.firstname, errorsFromNewUser.firstname);
};
const handleFocusFirstname = () => {
  isFirstNameValid(user.value.firstname, errorsFromNewUser.firstname);
};
const handleBlurFirstname = () => {
  isFirstNameValid(user.value.firstname, errorsFromNewUser.firstname);
};
//secondname field ===============================================
const handleImputSecondname = (event) => {
  user.value.secondname = event.target.value;
  isSecondnameValid(user.value.secondname, errorsFromNewUser.secondname);
};
const handleFocusSecondname = () => {
  isSecondnameValid(user.value.secondname, errorsFromNewUser.secondname);
};
const handleBlurSecondname = () => {
  isSecondnameValid(user.value.secondname, errorsFromNewUser.secondname);
};
//lastname field ==================================================
const handleImputLastname = (event) => {
  user.value.lastname = event.target.value;
  isLastnameValid(user.value.lastname, errorsFromNewUser.lastname);
};
const handleFocusLastname = () => {
  isLastnameValid(user.value.lastname, errorsFromNewUser.lastname);
};
const handleBlurLastname = () => {
  isLastnameValid(user.value.lastname, errorsFromNewUser.lastname);
};

const handleSaveChanges = async () => {
  doValidateErrorForm(user.value, errorsFromNewUser, false);
  if (isNewUserFormValid(errorsFromNewUser)) {
    try {
      await axios.put(
        `http://localhost:8888/users/${props.selectId}`,
        user.value
      );

      user.value = {};

      handleClickGoBack();
    } catch (error) {
      if (error?.response.status === 400) {
        const resDataErrors = error?.response.data.errors;
        Object.entries(resDataErrors).forEach(([key, errorMessage]) => {
          if (errorsFromNewUser[key] !== undefined) {
            errorsFromNewUser[key].isDirty = true;
            errorsFromNewUser[key].errors = errorMessage;
          }
        });
      }
    }
  }
};

const emit = defineEmits(["clickGoBack"]);
const handleClickGoBack = (event) => emit("clickGoBack", event);

onMounted(async () => {
  await loadDataById();
});
</script>

<style lang="scss" scoped>
.user-edit {
  &__panel-title {
    text-align: center;
    font-size: 30px;
    padding: 20px 10px;
    background-color: #112121;
    margin-bottom: 40px;
  }
  &__panel-main {
    max-width: 500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 20px;
  }
  &__button-panel {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
}
.button-panel {
  &__click-back {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #112121;
    }
  }
  &__click-save {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #112121;
    }
  }
}
</style>
