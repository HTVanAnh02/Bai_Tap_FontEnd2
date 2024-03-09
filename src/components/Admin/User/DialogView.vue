<template>
    <v-dialog max-width="500px">
        <v-form @submit.prevent="submit">
            <v-card style="border-radius: 12px !important;">
                <v-card-title
                    style="font-weight: bold;position:fixed;width: 100%;top: 0;background-color: white;z-index: 100;border-top-left-radius:12px ;border-top-right-radius: 12px;">
                    <h4 style="font-size: 18px;">{{ itemEdit ? "Tạo mới người dùng" : "Sửa người dùng" }}</h4>
                </v-card-title>
                <v-container class="mt-9" style="background-color: #F7F8FA">
                    <div style="display: block; margin-top: 12px;">
                        <span>Tên người dùng</span> <span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="name" placeholder="Nhập tên người dùng"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                        <span style="color:red">{{ nameError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Email</span><span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="email" placeholder="Nhập email"
                            style="background-color: white;border-radius: 6px;" density="compact" single-line
                            hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ emailError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Ngày sinh</span><span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="birthday" type="date"
                            style="background-color: white; border-radius: 6px;" density="compact" single-line
                            hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ birthdayError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Số điện thoại</span><span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="phone" placeholder="Nhập số điện thoại"
                            style="background-color: white;border-radius: 6px;" density="compact" single-line
                            hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ phoneError }}</span>

                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Quyền</span><span class="text-blue ml-2">*</span>
                        <v-radio-group style="font-size: 14px;" v-model="role" inline single-line hide-details>
                            <v-radio color="primary" density="compact" :label="Role.ADMIN"
                                :value="Role.ADMIN"></v-radio>
                            <v-radio color="primary" density="compact" :label="Role.USER" :value="Role.USER"></v-radio>
                        </v-radio-group>
                        <span style="color:red">{{ roleError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Avatar</span><span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="avatar" placeholder="Nhập link ảnh avatar"
                            style="background-color: white;border-radius: 6px;" density="compact" single-line
                            hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ avatarError }}</span>
                    </div>
                </v-container>
                <v-card-actions class="pr-4">
                    <v-spacer></v-spacer>
                    <v-btn width="70px" variant="outlined" height="32px"
                        style="font-family: Public Sans, sans-serif; font-size: 14px; margin-right: 16px; border: 1px solid #A1A9B8;border-radius: 6px;"
                        @click="close()" class="text-capitalize" text="Hủy"></v-btn>
                    <v-btn width="105px" height="32px"
                        style="font-family: Public Sans, sans-serif; font-size: 14px; border-radius: 6px;" type="submit"
                        color="#0F60FF" class="text-capitalize" variant="elevated">
                        {{ itemEdit ? "Tạo" : "Update" }}
                        <span class="text-lowercase">{{ itemEdit ? " mới" : "" }}</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import {  onUpdated, watch } from 'vue';
import { showSuccessNotification, showWarningsNotification } from '@/common/helper/helpers';
import { Loading } from '@/store/loading';
import { Role } from '@/common/contant/contants';
import { userServiceApi } from '@/service/user.api';
const loading = Loading()


const props = defineProps(['itemEdit'])
const emit = defineEmits(['close', 'loadData'])
watch(() => props.itemEdit, (newValue, oldValue) => {
    resetForm()
    if (props.itemEdit !== null) {
        getUserById(newValue)
    }
});
const getUserById = async (id) => {
    try {
        loading.setLoading(true)
        const data = await userServiceApi._getDetail(id);
        loading.setLoading(false)
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
onUpdated(() => {
    if (props.itemEdit === null)
        resetForm()
})




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
);
const { value: birthday, errorMessage: birthdayError } = useField(
    'birthday',
    yup
        .string()
        .required('Không được bỏ trống')
        .matches(
            /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            'Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng YYYY-MM-DD.'
        )
        .test('not-in-future', 'Ngày sinh không được trong tương lai', function (value) {
            const birthdayDate = new Date(value);
            const currentDate = new Date();
            return birthdayDate <= currentDate;
        })
);



const { value: phone, errorMessage: phoneError } = useField(
    'phone',
    yup
        .string()
        .required('Không được bỏ trống')
        .matches(
            /^0\d{9,10}$/,
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
    try {
        loading.setLoading(true)
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('email', email.value);
        formData.append('birthday', birthday.value);
        formData.append('phone', phone.value);
        formData.append('avatar', avatar.value);
        formData.append('role', role.value);
        if (props.itemEdit == null) {
            const data = await userServiceApi.createUser(formData);
            // console.log(data)
            if (!data.success) {
                alert("Tạo lỗi")
                showWarningsNotification(data.message)
            }
            else {
                close()
                emit('loadData')
                showSuccessNotification("Thêm thành công")
                empty()
            }
        }
        else {
            const data = await userServiceApi.updateUser(props.itemEdit.id, formData);
            console.log(data)
            if (!data.success) {
                showWarningsNotification(data.message)
            }
            else {
                close()
                emit('loadData')
                showSuccessNotification("cập nhật thành công")
                empty()
            }
        }
    } catch (error) {
        showWarningsNotification(error.message)
    } finally {
        loading.setLoading(false)
    }
});
const close = () => {
    emit('close')
    resetForm()
}
const empty = () => {
    props.itemEdit = null
}

</script>