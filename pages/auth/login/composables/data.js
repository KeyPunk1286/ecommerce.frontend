import {reactive, ref} from "vue";

export const pageName = ref('Login');

// Це обʼєкт який в собі вмістить інформацію
// яка вводиться в поля форми
export const formData = reactive({
    email: "",
    password: "",
});

// Це обʼєкт який копіює своїми ключами структуру formData
// але містить в собі данні про валідацію
export const errorsFormData = reactive({
    email: {
        isDirty: false, // Це поле відповідає за те чи вже чіпалось поле (якщо був івент focus цього поля)
        errors: [], // Це поле вмістить в собі масив строк валідаційних месаджів
    },
    password: {
        isDirty: false,
        errors: [],
    }
})