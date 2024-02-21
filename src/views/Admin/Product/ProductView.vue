
<script setup>
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import DialogViewVue from '@/components/Admin/Product/DialogView.vue';
import ConfirmVue from '@/components/confirm/IndexView.vue'
const isShowDialog = ref(false);
const isDialogDelete=ref(false)
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION)
let idEdit = ref(null)
let idDelete = ref(null)
let lengthPage=ref(1)
let page=ref(1)
const search=ref('')
import { formatNumberWithCommas, showErrorNotification, showSuccessNotification } from '../../../common/helper/helpers'
import { useProduct } from '../Product/product'
import { DEFAULT_LIMIT_FOR_PAGINATION } from '@/common/contant/contants';
import { productServiceApi } from '@/service/product.api';
const { fetchProducts, products, query, getAll,searchProducts} = useProduct()
onMounted(async () => {
  loadData()
})

const loadData = async () => {
  const res=await fetchProducts()
  products.value = res.data;
  lengthPage.value=Math.ceil(res.totalItems / seletedValue.value);
}
const searchData = async () => {
  const res=await searchProducts()
  products.value = res.data;
  lengthPage.value=Math.ceil(res.totalItems / seletedValue.value);
}
const addProduct = () => {
  isShowDialog.value = true
  idEdit = null
}
const updateProductById = id => {
  isShowDialog.value = true
  idEdit = id
}
const deleteProductById = async (id) => {
  const data = await productServiceApi._delete(id)
  // console.log(data)
  if (data.success) {
    loadData()
    isDialogDelete.value=false
    showSuccessNotification("Xóa thành công")
  }
  else {
    isDialogDelete.value=false
    showErrorNotification(data.message)
  }
}
const close = () => {
  isShowDialog.value = false
  isDialogDelete.value=false
}

watch(seletedValue,(newval)=>{
  // alert(newval)
  query.limit=newval
  query.page=1
  page.value=1
  loadData()
})
watch(search,(newval)=>{
  query.keyword=newval
  query.page=1
  searchData()
})
watch(page,(newVal)=>{
  query.page=newVal
  loadData()
})
</script>
<template>
  <div style="margin: 1.5%;">
    <v-row>
      <v-col cols="3">
        <v-text-field v-model="search" style="background-color: white;" density="compact" variant="outlined" label="Tìm kiếm"
          append-inner-icon="mdi mdi-magnify" single-line hide-details class="mr-2"></v-text-field>
      </v-col>
      <v-col cols="9" class="text-right">
        <v-btn @click="addProduct()" color="#0F60FF" prepend-icon="mdi mdi-plus" class="text-uppercase">Tạo  Mới</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-table density="compact">
            <thead>
              <tr>
                <th class="text-left text-uppercase text-medium-emphasis" style="opacity: 0.5;">
                  Tên sản phẩm
                </th>
                <th class="text-left text-uppercase text-medium-emphasis" style="opacity: 0.5;">
                  Giá
                </th>
                <th class="text-left text-uppercase text-medium-emphasis" style="opacity: 0.5;">
                  Số lượng
                </th>
                <th class="text-left text-uppercase text-medium-emphasis" style="opacity: 0.5;">
                  Mô tả
                </th>
                <th class="text-left text-uppercase text-medium-emphasis" style="opacity: 0.5;">
                  Ảnh
                </th>
                <th class="text-center text-uppercase text-medium-emphasis">
                  Acction
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="index">
                <td class="font-weight-bold" style="color: black;">{{ item.name }}</td>
                <td style="color: black;">{{ formatNumberWithCommas(item.price) }} đ</td>
                <td style="color: black;">{{ formatNumberWithCommas(item.quantity) }}</td>
                <td style="width: 250px;" class="v-text-truncate">
                  {{ item.description }}
                </td>
                <td>
                  <v-img width="36" height="36" :src="item.imageUrl"></v-img>
                </td>
                <td class="text-center">
                  <v-btn density="compact" variant="text"><i class="fa-regular fa-pen-to-square mr-4" @click="updateProductById(item.id)"></i><i @click="{isDialogDelete=true;idDelete=item.id}" class="fa-solid fa-trash"></i></v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-row class="ma-2">
            <v-col cols="8">
              <v-row>
                <p class="mt-5 opacity">Showing</p>
                <v-col cols="2">
                  <v-select v-model="seletedValue" density="compact" :items="['10', '20', '25', '30', '50']"
                    variant="outlined"></v-select>
                </v-col>
                <p class="mt-5 opacity">of 50</p>
              </v-row>
            </v-col>
            <v-col cols="4" class="">
              <v-pagination v-model="page" active-color="#0F60FF" variant="text" density="compact" :length="lengthPage"></v-pagination>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <DialogViewVue v-model="isShowDialog" :idEdit="idEdit" @close="close()" @loadData="loadData()" />
  <ConfirmVue v-model="isDialogDelete" :idDelete="idDelete" @delete="deleteProductById"/>
</template>
<style scoped>
.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.opacity {
  opacity: 0.6;
}
</style>