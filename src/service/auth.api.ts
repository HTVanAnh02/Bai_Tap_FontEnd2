import type { IBodyResponse } from '@/common/interface/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import type { IBodyLogin, ILoginResponse } from '../views/Login/interfaces';

class AuthApiService extends ApiService {
  async login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
    return await this.client.post(`${this.baseUrl}/login`, body);
  }
  logout(): Promise<IBodyResponse<Record<string, unknown>>> {
    return this.client.post(`${this.baseUrl}/logout`);
  }
  _getOwnProfile<R>(): Promise<IBodyResponse<R>> {
    return this.client.get('/user/my-profile');
  }
}

export const authServiceApi = new AuthApiService({ baseUrl: '/user' }, axiosInstance);
