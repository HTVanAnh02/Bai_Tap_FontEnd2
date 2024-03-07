<template>
  <div v-if="loadingStore.isLoading"  class="loading-overlay">
    <v-progress-circular
      :size="50"
      color="green"
      indeterminate
    ></v-progress-circular>
  </div>
</template>
<script setup>
import { Loading } from "@/store/loading";
const loadingStore = Loading()
</script>
<style scoped>
.loading-overlay {
position: fixed;
z-index: 1000000000;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(227, 227, 227, 0.5); 
display: flex;
justify-content: center;
align-items: center;
}
</style>