<template>
  <div style="margin: 1.5%;">
    <v-row>
    <v-col cols="3">
      <v-text-field v-model="search" style="background-color: white;" density="compact" variant="outlined" label="Tìm kiếm"
        append-inner-icon="mdi mdi-magnify" single-line hide-details class="mr-2"></v-text-field>
    </v-col>
    <v-col cols="9" class="text-right">
      <v-btn @click="addUser()" color="#0F60FF" prepend-icon="mdi mdi-plus" class="text-uppercase">Thêm</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left text-uppercase text-medium-emphasis">
                Avatar
              </th>
              <th class="text-left text-uppercase text-medium-emphasis">
                Tên người dùng
              </th>
              <th class="text-left text-uppercase text-medium-emphasis">
                Email
              </th>
              <th class="text-left text-uppercase text-medium-emphasis">
                Ngày sinh
              </th>
              <th class="text-left text-uppercase text-medium-emphasis">
                Số điện thoại
              </th>
              <th class="text-center text-uppercase text-medium-emphasis">
                Acction
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in users" :key="i">
              <td>
                <v-img class="ma-1" style="border-radius: 2px;"  width="36" height="36"
                  :src="i.avatar"></v-img>
              </td>
              <td>{{ i.name }}</td>
              <td>{{ i.email }}</td>
              <td class="v-text-truncate">
                {{ formatDateString(i.birthday,DD_MM_YYYY) }}
              </td>
              <td>
                {{ i.phone }}
              </td>
              <td class="text-center">
                <v-btn density="compact" variant="text"><i @click="updateUserById(i.id)" class="fa-regular fa-pen-to-square mr-4"></i><i @click="{isDialogDelete=true;idDelete=i.id}" class="fa-solid fa-trash"></i></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-row class="ma-2">
          <v-col cols="8">
            <v-row>
              <p class="mt-5 opacity">Showing</p>
              <v-col cols="2">
                <v-select v-model="seletedValue" density="compact" :items="['10', '20', '25', '30', '50']" variant="outlined"></v-select>
              </v-col>
              <p class="mt-5 opacity">of 50</p>
            </v-row>
          </v-col>
          <v-col cols="4" class="text-right">
            <v-pagination v-model="page" active-color="#red" variant="text" density="compact" :length="lengthPage"></v-pagination>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  </div>
  <DialogViewVue v-model="isShowDialog" :idEdit="idEdit" @close="close()" @loadData="loadData()" />
  <ConfirmVue v-model="isDialogDelete" :idDelete="idDelete" @delete="deleteUserById"/>
</template>
<script setup>
import {DATE_TIME_FORMAT} from '../../../common/contant/contants'
import { DEFAULT_LIMIT_FOR_PAGINATION } from '@/common/contant/contants';
import {formatDateString} from '../../../common/helper/helpers'
import { onMounted, ref, watch } from 'vue';
import DialogViewVue from '@/components/Admin/User/DialogView.vue';
import {useUser} from '../User/user'
import ConfirmVue from '@/components/confirm/IndexView.vue'
import { userServiceApi } from '@/service/user.api';
import { showErrorNotification, showSuccessNotification } from '@/common/helper/helpers';


const DD_MM_YYYY=DATE_TIME_FORMAT.DD_MM_YYYY_DASH
const isShowDialog = ref(false);
const isDialogDelete=ref(false)
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION)
const { fetchUsers, users, query,searchUsers} = useUser()
const search=ref('')
let idEdit = ref(null)
let idDelete = ref(null)
let lengthPage=ref(1)
let page=ref(1)
onMounted(async () => {
  loadData()
})
const loadData = async () => {
  const res=await fetchUsers()
  users.value = res.data;
  lengthPage.value=Math.ceil(res.totalItems / seletedValue.value);
}
const addUser = () => {
  isShowDialog.value = true
  idEdit = null
}

const updateUserById = id => {
  isShowDialog.value = true
  idEdit = id
}
const searchData = async () => {
  users.value = await searchUsers();
}

const deleteUserById = async (id) => {
  const data = await userServiceApi._delete(id)
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
}
watch(seletedValue,(newval)=>{
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