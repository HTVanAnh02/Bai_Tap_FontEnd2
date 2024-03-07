import { defineStore } from 'pinia'

export const Loading = defineStore({
  id: 'loading',
  state: () => ({
    isLoading: false
  }),
  actions: {
    setLoading(value:boolean) {
      this.isLoading = value
    }
  }
})
