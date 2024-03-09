
<template>
  <div style="margin: 1.5%;">
    <v-row>
      <v-col cols="5" sm="4" md="4" lg="3">
        <v-text-field v-model="search" style="width: 316px; height: 37px; background-color: white;border-radius: 10px;"
          density="compact" variant="solo" label="Tìm kiếm" append-inner-icon="mdi mdi-magnify" single-line hide-details
          class="mr-2" @keydown.enter="searchEnter()"></v-text-field>
      </v-col>
      <v-col cols="7" class="text-right" lg="9" sm="8" md="8">
        <v-btn @click="addProduct()" color="#0F60FF" prepend-icon="mdi mdi-plus" class="text-capitalize">
          <b>Tạo</b> <span class="text-lowercase" style="margin-left: 3px; font-weight: bold;">mới</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4" style="border-radius: 16px; border: 1px;">
          <v-table density="compact">
            <thead style="height: 47px;">
              <tr>
                <th class="text-left text-uppercase text-medium-emphasis">
                  Tên sản phẩm
                </th>
                <th class="text-left text-uppercase text-medium-emphasis">
                  Giá
                </th>
                <th class="text-left text-uppercase text-medium-emphasis">
                  Số lượng
                </th>
                <th class="text-left text-uppercase text-medium-emphasis">
                  Mô tả
                </th>
                <th class="text-left text-uppercase text-medium-emphasis">
                  Ảnh
                </th>
                <th class="text-center text-uppercase text-medium-emphasis">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="index">
                <td style="width: 250px;height: 58px;"><b>
                    <p
                      style="width: 100%;max-height: 58px;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                      {{ item.name }}</p>
                  </b></td>
                <td>${{ formatNumberWithCommas(item.price) }}</td>
                <td>{{ formatNumberWithCommas(item.quantity) }}</td>
                <td style="width: 250px;height: 58px;" class="v-text-truncate">
                  <p
                    style="width: 100%;max-height: 58px;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                    {{ item.description }}</p>
                </td>
                <td>
                  <v-img style="border-radius: 2px;" width="36" height="36" :src="item.imageUrl"></v-img>
                </td>
                <td class="text-center">
                  <v-btn density="compact" variant="text" @click="updateProductById(item)" style="max-witemdth: 24px;">
                    <v-img src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709200255/edit_sh0ub9.png"
                      width="24px" height="24px"></v-img>
                  </v-btn>

                  <v-btn density="compact" variant="text" class="ml-2" style="max-width: 24px;">
                    <v-img src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709200260/trash_wsowgu.png"
                      width="24px" height="24px" @click="{ isDialogDelete = true; idDelete = item.id }"></v-img>
                  </v-btn>
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </v-table>
          <v-row class="ma-2 ">
            <v-col cols="8" sm="8" md="8" lg="8">
              <v-row>
                <span class="mt-5 opacity">Showing</span>
                <v-col style="max-width: 105px" cols="5" sm="4" md="5" lg="2">
                  <v-select v-model="seletedValue" density="compact" :items="['10', '20', '25', '30', '50']"
                    variant="outlined"></v-select>
                </v-col>
                <span class="mt-5 opacity">of {{ TotalProducts }}</span>
              </v-row>
            </v-col>
            <v-col cols="4" sm="4" md="4" lg="4">
              <p class="text-center page-table1" style="font-size: 15px;display: none">
                <span @click="page = page - 1" :class="{ 'text-grey-lighten-2': page === 1, 'text-black': page !== 1 }"><i
                    class="fa-solid fa-angle-left" style="cursor: pointer;"></i></span>
                <span
                  style="background-color: rgb(109, 148, 227);color: blue;opacity: 0.6;;border-radius: 2px;padding: 5px;"
                  class="ml-2 mr-2">{{ page }}</span>
                <span @click="page = page + 1"
                  :class="{ 'text-grey-lighten-2': page === lengthPage, 'text-black': page !== lengthPage }"><i
                    class="fa-solid fa-chevron-right" style="cursor: pointer;"></i></span>
              </p>
              <v-pagination class="page-table2 mt-1" v-model="page" active-color="#0F60FF" variant="text"
                density="compact" :length="lengthPage"></v-pagination>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <DialogViewVue v-model="isShowDialog" :itemEdit="itemEdit" @close="close()" @loadData="loadData()" />
  <ConfirmVue v-model="isDialogDelete" @close="close()" :idDelete="idDelete" @delete="deleteProductById" />
</template>
<script setup>
import {  onMounted, ref, watch } from 'vue';
import DialogViewVue from '@/components/Admin/Product/DialogView.vue';
import ConfirmVue from '@/components/confirm/confirmView.vue'
const isShowDialog = ref(false);
const isDialogDelete = ref(false)
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION)
let itemEdit = ref(null)
let idDelete = ref(null)
let lengthPage = ref(1)
let page = ref(1)
const search = ref(null)
const TotalProducts = ref(null)
import { formatNumberWithCommas, showErrorNotification, showSuccessNotification, showWarningsNotification } from '../../../common/helper/helpers'
import { useProduct } from '../Product/product'
import { DEFAULT_LIMIT_FOR_PAGINATION } from '@/common/contant/contants';
import { productServiceApi } from '@/service/product.api';
import { checkSearchEnter } from '../../../common/helper/helpers'
const { fetchProducts, products, query, searchProducts } = useProduct()
onMounted(async () => {
  query.keyword = ''
  query.page = 1
  loadData()
})

const loadData = async () => {
  const res = await fetchProducts()
  if (res.data) {
    products.value = res.data;
    lengthPage.value = Math.ceil(res.totalItems / seletedValue.value);
    TotalProducts.value = res.totalItems
    return
  }
  products.value = []
}

const addProduct = () => {
  isShowDialog.value = true
  itemEdit = null
}
const updateProductById = item => {
  isShowDialog.value = true
  itemEdit = item
}
const deleteProductById = async (id) => {
  const data = await productServiceApi._delete(id)

  if (data.success) {
    loadData()
    isDialogDelete.value = false
    showSuccessNotification("Xóa thành công")
  }
  else {
    isDialogDelete.value = false
    showErrorNotification(data.message)
  }
}
const searchData = async () => {
  const res = await searchProducts()
  if(res.data)
  {
    products.value = res.data;
    lengthPage.value = Math.ceil(res.totalItems / seletedValue.value);
    TotalProducts.value=res.totalItems
    return
  }
  products.value=[]
}
const close = () => {
  isShowDialog.value = false
  isDialogDelete.value = false
}
const searchEnter = () => {
  if(checkSearchEnter(search.value))
  {
    query.keyword = search.value
    query.page = 1
    searchData()
  }
  else
  {
    showWarningsNotification("Không nhập ký tự đặc biệt")
  }
};
watch(seletedValue, (newval) => {
  query.limit = newval
  query.page = 1
  page.value = 1
  loadData()
})
watch(search, (newval) => {
  if(search.value==="")
  {
    query.keyword = search.value
    query.page = 1
    searchData()
  }
})
watch(page, (newVal,oldVal) => {
  if(page.value<1)
  {
    page.value=oldVal
    return 
  }
  if(page.value>lengthPage.value)
  {
    page.value=oldVal
    return
  }
  query.page = newVal
  loadData()
})
watch(isShowDialog,(newVal)=>{
  if(newVal==false)
    itemEdit=null
})
</script>
<style scoped>
.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.opacity {
  opacity: 0.6;
}

.hover-effect {
  opacity: 1;
}

.v-table {
  font-size: 15px;
}

@media (max-width: 500px) {
  .opacity {
    display: none;
  }

  .v-btn__content {
    font-size: 10px;
  }

  .text-medium-emphasis {
    font-size: 12px;
  }

  .page-table1 {
    display: inline !important;
  }

  .page-table2 {
    display: none !important;
  }
}
</style>