<template>
    <v-dialog v-model="dialog" v-for="i in users" :key="i" max-width="500px">
      <v-card>
        <v-card-title>{{ i.name }}</v-card-title>
        <v-card-subtitle>{{ i.email }}</v-card-subtitle>
        <v-card-actions>
          <v-btn @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
      dialog: Boolean,
    },
    methods: {
      closeDialog() {
        this.$emit('close');
      },
    },
  };
  </script>