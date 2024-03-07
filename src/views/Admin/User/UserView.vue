<template>
  <div style="margin: 1.5%;">
    <v-row>
      <v-col cols="3">
        <v-text-field v-model="search" style="width: 316px; height: 37px; background-color: white;border-radius: 10px;"
          density="compact" variant="solo" label="Tìm kiếm" append-inner-icon="mdi mdi-magnify" single-line hide-details
          class="mr-2" @keydown.enter="searchEnter()"></v-text-field>
      </v-col>
      <v-col cols="7" class="text-right" lg="9" sm="8" md="8">
        <v-btn @click="addUser()" color="#0F60FF" prepend-icon="mdi mdi-plus" class="text-capitalize">
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
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in users" :key="i">
                <td>
                  <v-img class="ma-1" style="border-radius: 2px;" width="36" height="36" :src="i.avatar"></v-img>
                </td>
                <td style="width: 250px;height: 58px;"><b>
                    <p
                      style="width: 100%;max-height: 58px;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                      {{ i.name }}</p>
                  </b></td>
                <td>{{ i.email }}</td>
                <td class="v-text-truncate">
                  {{
                    i.birthday === undefined ||
                        i.birthday === "" ||
                        i.birthday === null
                        ? ""
                        : formatDatetime(i.birthday)
                }}
                </td>
                <td>
                  {{ i.phone }}
                </td>
                <td class="text-center">
                  <v-btn density="compact" variant="text" @click="updateUserById(i.id)" style="max-width: 24px;">
                    <v-img src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709200255/edit_sh0ub9.png"
                      width="24px" height="24px"></v-img>
                  </v-btn>

                  <v-btn density="compact" variant="text" class="ml-2" style="max-width: 24px;">
                    <v-img src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709200260/trash_wsowgu.png"
                      width="24px" height="24px" @click="{ isDialogDelete = true; idDelete = i.id }"></v-img>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-row class="ma-2">
            <v-col cols="8" sm="8" md="8" lg="8">
              <v-row>
                <span class="mt-5 opacity">Showing</span>
                <v-col style="max-width: 105px" cols="5" sm="4" md="5" lg="2">
                  <v-select v-model="seletedValue" density="compact" :items="['10', '20', '25', '30', '50']"
                    variant="outlined"></v-select>
                </v-col>
                <span class="mt-5 opacity">of {{ TotalUsers }}</span>
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
  <DialogViewVue v-model="isShowDialog" :idEdit="idEdit" @close="close()" @loadData="loadData()" />
  <ConfirmVue v-model="isDialogDelete" :idDelete="idDelete" @delete="deleteUserById" />
</template>
<script setup>
import { DATE_TIME_FORMAT } from '../../../common/contant/contants'
import { DEFAULT_LIMIT_FOR_PAGINATION } from '@/common/contant/contants';
import { checkSearchUserEnter, formatDateString } from '../../../common/helper/helpers'
import { onMounted, ref, watch } from 'vue';
import DialogViewVue from '@/components/Admin/User/DialogView.vue';
import { useUser } from '../User/user'
import ConfirmVue from '@/components/confirm/confirmView.vue'
import { userServiceApi } from '@/service/user.api';
import { showErrorNotification, showSuccessNotification } from '@/common/helper/helpers';
const DD_MM_YYYY = DATE_TIME_FORMAT.DD_MM_YYYY_DASH
const isShowDialog = ref(false);
const isDialogDelete = ref(false)
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION)
const { fetchUsers, users, query, searchUsers } = useUser()
const search = ref(null)
const TotalUsers = ref(null)
let idEdit = ref(null)
let idDelete = ref(null)
let lengthPage = ref(1)
let page = ref(1)
onMounted(async () => {
  query.keyword = ''
  query.page = 1
  loadData()
})
const formatDatetime = (date) => {
    const dateObject = new Date(date);
    const ngay = dateObject.getDate().toString().padStart(2, "0");
    const thang = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const nam = dateObject.getFullYear();
    const ngayThangNam = `${thang}/${ngay}/${nam}`;
    return ngayThangNam;
};
const loadData = async () => {
  const res = await fetchUsers()
  users.value = res.data;
  lengthPage.value = Math.ceil(res.totalItems / seletedValue.value);
  TotalUsers.value = res.totalItems
  return
}
const addUser = () => {
  isShowDialog.value = true
  idEdit = null
}

const updateUserById = id => {
  isShowDialog.value = true
  idEdit = id
}
const searchEnter = () => {
  if(checkSearchUserEnter(search.value))
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
const searchData = async () => {
  const res = await searchUsers()
  if (res.data) {
    users.value = res.data;
    lengthPage.value = Math.ceil(res.totalItems / seletedValue.value);
    TotalUsers.value = res.totalItems
    return
  }
  users.value = []
}

const deleteUserById = async (id) => {
  const data = await userServiceApi._delete(id)
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
const close = () => {
  isShowDialog.value = false
}
watch(seletedValue, (newval) => {
  query.limit = newval
  query.page = 1
  page.value = 1
  loadData()
})
watch(search, (newval) => {
  query.keyword = newval
  query.page = 1
  searchData()
})

watch(page, (newVal) => {
  query.page = newVal
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