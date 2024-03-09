import {  ref } from "vue";
import { productServiceApi } from "@/service/product.api";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/contant/contants";
import { IProduct } from "./interfaces";
import { Loading } from "@/store/loading";
export const useProduct = () => {
    const loading=Loading()
    const products = ref<IProduct[]>([])
    const query=DEFAULT_COMMON_LIST_QUERY
    const fetchProducts = async () => {
      try {
        loading.setLoading(true)
        const res = await productServiceApi._getList<IProduct>(query);
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
        console.error('Error fetching products:', error);
      }
    };
    const searchProducts = async () => {
      try {
        console.log(FormData);
        
        loading.setLoading(true); // Bắt đầu hiển thị trạng thái tải
    
        const res = await productServiceApi._getList<IProduct>(query);
        
        if (res.success) {
          const data = res.items;
          const totalItems = res.totalItems;
          return { data, totalItems };
        }
        
        return null;
      } catch (error) {
        console.error('Error fetching products:', error);
        return null;
      } finally {
        loading.setLoading(false); // Kết thúc hiển thị trạng thái tải
      }
    };
    
    
    return {
      products, // Thay thế 'products' bằng biến hoặc đối tượng chứa danh sách sản phẩm
      fetchProducts, // Thay thế 'fetchProducts' bằng hàm để lấy danh sách sản phẩm
      query, // Thay thế 'query' bằng biến hoặc đối tượng chứa thông tin truy vấn
      searchProducts // Thay thế 'searchProducts' bằng hàm để tìm kiếm sản phẩm
    };
};
