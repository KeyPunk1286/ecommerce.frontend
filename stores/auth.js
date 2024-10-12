import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null
    }),
    actions: {
        setAccessToken(accessToken = null) {
            this.accessToken = accessToken;
        }
    }
})