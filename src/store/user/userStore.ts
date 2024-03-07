import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
    const userRole = ref();
    const isFetching = ref(false);
    const isShowDialogChangePassword = ref(false);
  
    const profile = computed(() => {
    });
  
    return {
      isFetching,
      profile,
      userRole,
      isShowDialogChangePassword,
    };
});