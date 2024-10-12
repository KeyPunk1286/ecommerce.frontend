export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    let accessToken = authStore.accessToken;

    if (process.client) {
        accessToken = accessToken || localStorage.getItem('accessToken');
    }

    if (accessToken) {
        return navigateTo('/');
    }
});