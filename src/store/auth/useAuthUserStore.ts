import { defineStore } from 'pinia'
// import router from '@/router'
// import axios from '@/plugins/axios/axios'
import { IAuthUserInterface,IUserInterface } from '@/common/interface/interfaces'
import localStorageAuthService from '@/common/storages/authStorage'
// import { showErrorNotification } from '@/common/helper/helpers'
import { authServiceApi } from '@/service/auth.api'

const initalUserState: Partial<IUserInterface> = {
    user: '',
    isUserLoggedIn: false,
    token: ''
  }
export const useAuthUserStore=defineStore('authUser',{
    state:()=>{
        return{
            user: initalUserState,
            loadingSession: false
        }
    },
    getters:{
        getAccessToken:(state): string | undefined => state.user.token
    },
    actions:{
        async login(userDetails: Partial<IAuthUserInterface>):Promise<boolean>{
            const { email: email, password: password } = userDetails
            try {
                const res=await authServiceApi.login(userDetails)
                console.log(res)
                
                if(res.success==true)
                {
                    localStorageAuthService.setAccessToken(res.data.accessToken.token)
                    return true
                }
                return false
              } catch (error: unknown) {
                console.log(error)
                return false
              } finally {
              }
        }
    }
})