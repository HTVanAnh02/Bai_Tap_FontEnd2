import localStorageAuthService from '@/common/storages/authStorage';
import { defineStore } from 'pinia';
import { authServiceApi } from '@/service/auth.api';
import type { IBodyLogin, IRegister } from '@/views/Login/interfaces';
import { computed } from 'vue';
import dayjs from '@/plugins/dayjs';
import { logout } from '@/plugins/axios/utils';
import { showWarningsNotification } from '@/common/helper/helpers';

export const AuthStore = defineStore('authStore', () => {

  async function logoutAction() {
    await authServiceApi.logout();
    logout();
  }
  async function login(body: IBodyLogin) {
    const res = await authServiceApi.login(body);

    if (res.success) {
        const { data } = res;

        localStorageAuthService.setAccessToken(data.accessToken.token);
        localStorageAuthService.setAccessTokenExpiredAt(data.accessToken.expiresIn);

        localStorageAuthService.setRefreshToken(data.refreshToken.token);
        localStorageAuthService.setRefresh_TokenExpiredAt(data.refreshToken.expiresIn);

        const profile = data.profile || {};  // Đảm bảo profile không null
        localStorageAuthService.setUserRole(profile.role || "");
        localStorageAuthService.setAvatar(profile.avatar || "");
        localStorageAuthService.setName(profile.name || "");
        localStorageAuthService.setPhone(profile.phone || "");

        return true;
    }

    return false;
}
  async function register(body: IRegister) {
    const res = await authServiceApi.register(body)
    if (!res.success) {
      showWarningsNotification(res.message)
      return false
    }
    return true
  }

  const isAuthenticated = computed(() => {
    const token = localStorageAuthService.getAccessToken();
    const expiredAt = localStorageAuthService.getAccessTokenExpiredAt();
    return Boolean(token && expiredAt && !dayjs(dayjs(expiredAt)).isBefore());
  });
  const hasToken = computed(() => {
    return !!localStorageAuthService.getAccessToken();
  });
  return {
    login,
    logoutAction,
    hasToken,
    isAuthenticated,
    register
  };
});
