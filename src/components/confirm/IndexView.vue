<template>
    <v-dialog max-width="350">
      <v-card>
        <v-card-title class="headline">Xác nhận xóa</v-card-title>
        <v-card-text class="text-red">
          Bạn có chắc chắn muốn xóa không?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" variant="text" @click="cancel">Hủy</v-btn>
          <v-btn color="Dark"  @click="emit('delete',props.idDelete)" variant="text">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script setup>
const props = defineProps(['idDelete'])
const emit = defineEmits(['delete'])
</script>