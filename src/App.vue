<template>
  <router-view/>
  <LoadingViewVue/>
</template>

<script>
import LoadingViewVue from '@/components/Loading/LoadingView.vue'
export default{
  components:{
    LoadingViewVue
  }
}
</script>

