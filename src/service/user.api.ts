import type { IBodyResponse } from '@/common/interface/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
// import { IBodyUser } from '@/views/Admin/Product/interfaces';
import localStorageAuthService from "@/common/storages/authStorage";


class UserApiService extends ApiService {
  // async getAll(): Promise<IBodyResponse<any>> {
  //   return this.client.get(`${this.baseUrl}`);
  // }
  async createUser(formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.post(`${this.baseUrl}`, formData, {
      headers: {
        'Authorization': 'Bearer '+localStorageAuthService.getAccessToken()
      },
    });
  }
  async updateUser(id:string,formData: FormData): Promise<IBodyResponse<any>> {
    return await this.client.patch(`${this.baseUrl}/${id}`, formData, {
      headers: {
        'Authorization': 'Bearer '+localStorageAuthService.getAccessToken()
      },
    });
  }
}

export const userServiceApi = new UserApiService({ baseUrl: '/user' }, axiosInstance);
