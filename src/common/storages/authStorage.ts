import { storage } from "./localStorage";
import { DEFAULT_LANGUAGE, SupportLanguage } from '../contant/contants';
const BUFFER_TIME = 60 * 1000; // 60s

export const enum AUTH_SERVICE_KEY {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  USER = "USER",
  ROLE = "ROLE",
  LANGUAGE = "LANGUAGE",
  ACCESS_TOKEN_EXPIRED_AT = "ACCESS_TOKEN_EXPIRED_AT",
  REFRESH_TOKEN_EXPIRED_AT = "REFRESH_TOKEN_EXPIRED_AT",
  AVATAR="AVATAR",
  EMAIL ="EMAIL"
}
class LocalStorageAuthService {
  setAccessToken(token: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, token);
  }
  getAccessToken(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
  }
  removeAccessToken():void{
    storage.removeLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN)
  }

  setAccessTokenExpiredAt(expiredIn: number): void {
    const expiredAt = new Date().getTime() + expiredIn * 1000 - BUFFER_TIME;
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT, String(expiredAt));
  }
  getAccessTokenExpiredAt(): number {
    return +storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT);
  }
  removeAccessTokenExpiredAt():void{
    storage.removeLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT)
  }

  setRefreshToken(token: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, token);
  }
  getRefreshToken(): string {
    return storage.getLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN);
  }
  removeRefreshToken():void{
    storage.removeLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN)
  }

  setRefresh_TokenExpiredAt(expiredIn: number): void {
    const expiredAt = new Date().getTime() + expiredIn * 1 - BUFFER_TIME;
    storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT, String(expiredAt));
  }
  getRefresh_TokenExpiredAt(): number {
    return +storage.getLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT);
  }
  removeRefresh_TokenExpiredAt():void{
    storage.removeLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT)
  }

  setUserRole(role: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ROLE, role);
  }
  getUserRole():string{
    return storage.getLocalStorage(AUTH_SERVICE_KEY.ROLE); 
  }
  removeUserRole():void{
    storage.removeLocalStorage(AUTH_SERVICE_KEY.ROLE)
  }

  resetAccessToken(): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, '');
  }
  resetAccessTokenExpiredAt(): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT, '');
  }

  setLanguage(value: SupportLanguage): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.LANGUAGE, value);
  }
  getLanguage(): SupportLanguage {
    return (storage.getLocalStorage(AUTH_SERVICE_KEY.LANGUAGE) ||
      DEFAULT_LANGUAGE) as SupportLanguage;
  }

  setAvatar(avatar: string): void {
    storage.setLocalStorage(AUTH_SERVICE_KEY.AVATAR, avatar);
  }
  getAvatar():string{
    return storage.getLocalStorage(AUTH_SERVICE_KEY.AVATAR); 
  }
  getHeader() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      'Accept-Language': this.getLanguage() || DEFAULT_LANGUAGE,
    };
  } 

  resetAll(): void {
    this.resetAccessToken();
    this.resetAccessTokenExpiredAt();
    // this.setLoginUser(null, null);
  }
  removeAll():void{
    this.removeAccessToken()
    this.removeAccessTokenExpiredAt()
    this.removeRefreshToken()
    this.removeRefresh_TokenExpiredAt()
    this.removeUserRole()
  }
}
export const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;
