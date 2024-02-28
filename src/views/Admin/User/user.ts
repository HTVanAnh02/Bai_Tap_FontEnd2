import { ref } from "vue";
import { userServiceApi } from "@/service/user.api";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/contant/contants";
import { useLoadingStore } from "@/store/loading";
import { IUser } from "./interface";
export const useUser=()=>{
    const loading=useLoadingStore()
    const users = ref<IUser[]>([])
    const query=DEFAULT_COMMON_LIST_QUERY
    
    const fetchUsers = async () => {
        try {
          loading.setLoading(true)
          const res = await userServiceApi._getList<IUser>(query);
          console.log(res);
          loading.setLoading(false)
          if(res.success)
          {
            return {
              data:res.items,
              totalItems:res.totalItems
            }
          }
          else{
            return {
              data:[],
              totalItems:0
            }
          }  
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      const searchUsers = async () => {
        try {
          const res = await userServiceApi._getList<IUser>(query);
          if(res.success)
              return res.items
          return null
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    return{
        users,
        fetchUsers,
        query,
        searchUsers
    }
}