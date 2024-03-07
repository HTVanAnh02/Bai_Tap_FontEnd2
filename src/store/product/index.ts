import { defineStore } from "pinia"

export const commonTitleProduct = defineStore({
    id: 'common',
    state: () => ({
        titleproduct: "Danh sách sản phẩm"
    }),
    actions: {
      setTitleProduct(value:string) {
        this.titleproduct = value
      }
    }
})
