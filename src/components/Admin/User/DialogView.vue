<template>
    <v-dialog max-width="500px">
        <v-form @submit.prevent="submit">
            <v-card>
                <v-card-title
                    style="font-weight: bold;position:fixed;width: 100%;top: 0;background-color: white;z-index: 100;">
                    <h4>{{ id ? "Sửa user" : "Thêm user" }}</h4>
                </v-card-title>
                <v-container class="mt-10" style="background-color: rgb(247, 247, 247);">
                    <v-row>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Tên người dùng</span> <span class="text-blue ml-2">*</span>
                            <v-text-field v-model="name" placeholder="Nhập tên người dùng" style="background-color: white;"
                                density="compact" single-line hide-details variant="outlined"></v-text-field>
                            <span style="color:red">{{ nameError }}</span>
                        </v-col>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Email</span><span class="text-blue ml-2">*</span>
                            <v-text-field v-model="email" placeholder="Nhập email người dùng"
                                style="background-color: white;" density="compact" single-line hide-details
                                variant="outlined"></v-text-field>
                            <span style="color:red">{{ emailError }}</span>
                        </v-col>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Ngày sinh</span><span class="text-blue ml-2">*</span>
                            <v-text-field v-model="birthday" type="date" style="background-color: white;" density="compact"
                                single-line hide-details variant="outlined"></v-text-field>
                            <span style="color:red">{{ birthdayError }}</span>
                        </v-col>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Số điện thoại</span><span class="text-blue ml-2">*</span>
                            <v-text-field v-model="phone" placeholder="Nhập số điện thoại người dùng"
                                style="background-color: white;" density="compact" single-line hide-details
                                variant="outlined"></v-text-field>
                            <span style="color:red">{{ phoneError }}</span>

                        </v-col>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Quyền</span><span class="text-blue ml-2">*</span>
                            <v-radio-group v-model="role" style="font-size: 13px;" class="mt-2" inline single-line
                                hide-details>
                                <v-radio color="primary" density="compact" :label="Role.ADMIN"
                                    :value="Role.ADMIN"></v-radio>
                                <v-radio color="primary" density="compact" :label="Role.USER" :value="Role.USER"></v-radio>
                            </v-radio-group>
                            <span style="color:red">{{ roleError }}</span>
                        </v-col>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Avatar</span><span class="text-blue ml-2">*</span>
                            <v-text-field v-model="avatar" placeholder="Nhập link ảnh avatar"
                                style="background-color: white;" density="compact" single-line hide-details
                                variant="outlined"></v-text-field>
                            <span style="color:red">{{ avatarError }}</span>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions class="pr-4">
                    <v-spacer></v-spacer>
                    <v-btn class="text-capitalize" @click="close()" text="Hủy"></v-btn>
                    <!-- <v-btn type="submit" color="#0F60FF" class="text-capitalize" variant="elevated">{{ idEdit ? "Cập" :
                        "Thêm"
                    }}<span class="text-lowercase">{{ idEdit ? "nhật" : "mới" }}</span></v-btn> -->
                    <v-btn type="submit" color="#0F60FF" class="text-capitalize" variant="elevated">{{
                        idEdit ? "Update" : "Thêm" }}<span class="text-lowercase">{{ idEdit ? "" : "mới" }}</span></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { ref, watch } from 'vue';
import { productServiceApi } from '@/service/product.api';
import { showSuccessNotification, showWarningsNotification } from '@/common/helper/helpers';
import { useLoadingStore } from '@/store/loading';
import { Role } from '@/common/contant/contants';
import { userServiceApi } from '@/service/user.api';
const loading = useLoadingStore()


const props = defineProps(['idEdit'])
const emit = defineEmits(['close', 'loadData'])
let id = props.idEdit
watch(() => props.idEdit, (newValue, oldValue) => {
    resetForm()
    id = newValue
    if (props.idEdit !== null) {
        getUserById(id)
    }
});
const getUserById = async (id) => {
    try {
        const data = await userServiceApi._getDetail(id);
        if (data.success) {
            name.value = data.data.name;
            email.value = data.data.email;
            birthday.value = data.data.birthday;
            phone.value = data.data.phone;
            role.value = data.data.role;
            avatar.value = data.data.avatar;
        }
        else {
            showWarningsNotification(data.message)
        }
    } catch (error) {
        console.error('Error fetching product detail:', error);
    }
}



const { handleSubmit, resetForm } = useForm();

const { value: name, errorMessage: nameError } = useField(
    'name',
    yup
        .string()
        .required('Không được bỏ trống')
        .matches(
            /^[a-zA-ZÀ-Ỹà-ỹ ]*$/,
            'Tên không hợp lệ. Tên chỉ được chứa chữ cái và khoảng trắng.'
        )
);

const { value: email, errorMessage: emailError } = useField(
    'email',
    yup
        .string()
        .required('Không được bỏ trống')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email không hợp lệ'
        )
); const { value: birthday, errorMessage: birthdayError } = useField(
    'birthday',
    yup
        .string()
        .required('Không được bỏ trống')
        .matches(
            /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            'Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng YYYY-MM-DD.'
        )
);



const { value: phone, errorMessage: phoneError } = useField(
    'phone',
    yup
        .string()
        .required('Không được bỏ trống')
        .matches(
            /^[0-9]{10}$/,
            'Số điện thoại không hợp lệ. Số điện thoại phải có 10 chữ số.'
        )
);
const { value: role, errorMessage: roleError } = useField(
    'role',
    yup
        .string()
        .required('Không được bỏ trống')
);

const { value: avatar, errorMessage: avatarError } = useField(
    'avatar',
    yup
        .string()
        .required('Không được bỏ trống')
        .matches(
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            'Đây không phải là một URL hợp lệ'
        )
);



const submit = handleSubmit(async () => {
    loading.setLoading(true)
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('birthday', birthday.value);
    formData.append('phone', phone.value);
    formData.append('avatar', avatar.value);
    formData.append('role', role.value);
    if (id == null) {
        // alert("Thêm")
        const data = await userServiceApi.createUser(formData);
        if (!data.success) {
            loading.setLoading(false)
            close()
            showWarningsNotification(data.message)
        }
        else {
            loading.setLoading(false)
            close()
            emit('loadData')
            showSuccessNotification("Thêm thành công")
        }
    }
    else {
        // alert("sửa")
        const data = await userServiceApi.updateUser(id, formData);
        // console.log(data)
        if (!data.success) {
            close()
            loading.setLoading(false)
            showWarningsNotification(data.message)
            showWarningsNotification(data.error)
        }
        else {
            loading.setLoading(false)
            close()
            emit('loadData')
            showSuccessNotification("Cập nhật thành công")
        }
    }
});
const close = () => {
    emit('close')
    resetForm()
}
const empty = () => {
    id = null;
    props.idEdit = null
}
</script>