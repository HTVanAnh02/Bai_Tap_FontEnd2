<!-- NotFound.vue -->
<template>
  <v-container fluid class="not-found-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card class="not-found-card">
          <v-card-title class="not-found-title">404</v-card-title>
          <v-card-subtitle class="not-found-subtitle">Trang không tồn tại</v-card-subtitle>
          <v-card-text class="not-found-text">Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</v-card-text>
          <v-btn to="/" color="primary" class="not-found-button">Quay lại Trang Chủ</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-card {
  max-width: 400px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.not-found-title {
  font-size: 48px;
  color: red;
}

.not-found-subtitle {
  font-size: 24px;
}

.not-found-text {
  margin-bottom: 20px;
}

.not-found-button {
  margin-top: 20px;
}
</style>
