import { ref } from "vue";
import { userServiceApi } from "@/service/user.api";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/contant/contants";
import { Loading } from "@/store/loading";
import { IUser } from "./interface";
export const useUser=()=>{
    const loading=Loading()
    const users = ref<IUser[]>([])
    const query=DEFAULT_COMMON_LIST_QUERY
    const fetchUsers = async () => {
      try {
        loading.setLoading(true)
        const res = await userServiceApi._getList<IUser>(query);
        console.log(res);
        loading.setLoading(false)
        if(res.success)
          return {
            data:res.items,
            totalItems:res.totalItems
          }
      else{
        return {
          data:[],
          totalItems:0
        }
      }     
    } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
      const searchUsers = async () => {
        try {
          console.log(FormData);
          
          loading.setLoading(true); // Bắt đầu hiển thị trạng thái tải
      
          const res = await userServiceApi._getList<IUser>(query);
          
          if (res.success) {
            const data = res.items;
            const totalItems = res.totalItems;
            return { data, totalItems };
          }
          
          return null;
        } catch (error) {
          console.error('Error fetching users:', error);
          return null;
        } finally {
          loading.setLoading(false); // Kết thúc hiển thị trạng thái tải
        }
      };
      
      
      return {
        users, // Thay thế 'users' bằng biến hoặc đối tượng chứa danh sách sản phẩm
        fetchUsers, // Thay thế 'fetchUsers' bằng hàm để lấy danh sách sản phẩm
        query, // Thay thế 'query' bằng biến hoặc đối tượng chứa thông tin truy vấn
        searchUsers // Thay thế 'searchUsers' bằng hàm để tìm kiếm sản phẩm
      };
}