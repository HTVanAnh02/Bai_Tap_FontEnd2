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
<style>
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #333;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}</style>

