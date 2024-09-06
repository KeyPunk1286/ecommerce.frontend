<template>
  <header class="header">
    <div class="header__left">
      Logo
    </div>
    <div class="header__right">
      <div class="header__right__nav">
        <div
            v-for="item in navMenu" :key="item.to"
            class="header__right__nav-item"><NuxtLink :to="item.to">{{ item.menuItemTitle }}</NuxtLink></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import {reactive} from "vue";

const navMenu = reactive([
  {
    menuItemTitle: "Home",
    to: "/"
  },
  {
    menuItemTitle: "About",
    to: "/about"
  },
  {
    menuItemTitle: "Login",
    to: "/auth/login"
  },
  {
    menuItemTitle: "Register",
    to: "/auth/register"
  }
]);
</script>

<style scoped lang="scss">
.header {
  height: 100px;
  width: 100vw;
  border-bottom: 1px solid darkslategray;

  padding: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__left {}
  &__right {

    &__nav {
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &-item {
        margin-left: 20px;

        &:first-child {
          margin-left: 0;

          a {
            color: #eeeaea;
            text-decoration: none;

            &:visited {
              color: #bebbbb;
            }
          }
        }
      }
    }
  }
}
</style>