<template>
  <header class="header">
    <div class="header__left-part">Logo</div>
    <div class="header__right-part right-part">
      <div class="right-part__link">
        <div
          v-for="item in filteredNavMenu"
          :key="item.to"
          class="right-part__list"
        >
          <NuxtLink
            v-if="!item.isLogout"
            class="right-part__item"
            :to="item.to"
            >{{ item.menuItemTitle }}</NuxtLink
          >
          <NuxtLink
            v-else
            class="right-part__item"
            :to="'#'"
            @click.prevent="handleLogout"
            >{{ item.menuItemTitle }}</NuxtLink
          >
          <!-- <button v-else @click="handleLogout">{{ item.menuItemTitle }}</button> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import useLocalStorage from "@/composables/useLocalStorage.js";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/global.js";

const authStore = useAuthStore();
const isAuthenticatedStatus = computed(() => !!authStore.accessToken);

const { getItem, removeItem } = useLocalStorage();
const detectToken = () => {
  const token = getItem(ACCESS_TOKEN_STORAGE_KEY);
  if (token) {
    authStore.setAccessToken(token);
  }
};

const navMenu = reactive([
  {
    menuItemTitle: "Home",
    to: "/",
  },
  {
    menuItemTitle: "Gallery",
    to: "/gallery",
  },
  {
    menuItemTitle: "About",
    to: "/about",
  },
  {
    menuItemTitle: "Login",
    to: "/auth/login",
    isLogout: false,
  },
  {
    menuItemTitle: "Logout",
    to: "/auth/logout",
    isLogout: true,
  },
  {
    menuItemTitle: "Register",
    to: "/auth/register",
  },
]);
const filteredNavMenu = computed(() =>
  navMenu.filter((menuItem) => {
    if (isAuthenticatedStatus.value) {
      return (
        !menuItem.to.includes("/auth/login") &&
        !menuItem.to.includes("/auth/register")
      );
    } else {
      return !menuItem.isLogout;
    }
  })
);

const router = useRouter();
const handleLogout = () => {
  authStore.setAccessToken(null);
  removeItem(ACCESS_TOKEN_STORAGE_KEY);
  router.push("/auth/register");
};

onMounted(() => {
  detectToken();
});
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

  &__right-part {
  }
}
.right-part {
  &__link {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & > *:not(:first-child) {
      margin-left: 20px;
    }
  }
  &__item {
    color: #eeeaea;
    text-decoration: none;
    &:visited {
      color: #7c7b7b;
    }
  }
}
</style>
