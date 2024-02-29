<template>
  <v-dialog max-width="350" @click:outside="cancel" @keydown.esc="cancel">
    <v-card>
      <v-card-text class="text-black font-weight-bold">Bạn có chắc chắn muốn xóa không?</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="green lighten-2" class="mr-4" text @click="cancel" elevation="2">Hủy</v-btn>
        <v-btn color="red darken-2" dark @click="deleteItem" elevation="2">Xóa</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['idDelete']);
const emit = defineEmits(['delete']);

const cancel = () => {
  emit('close');
};

const deleteItem = () => {
  emit('delete', props.idDelete);
  cancel();
};
</script>

<style scoped>
.close-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
