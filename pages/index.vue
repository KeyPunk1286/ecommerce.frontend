<template>
  <div>{{pageName}} page</div>
</template>

<script setup>
import {ref} from "vue";

definePageMeta({
  middleware: 'auth'
});

const pageName = ref('Home');

</script>