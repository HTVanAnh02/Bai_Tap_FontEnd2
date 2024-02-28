<template>
    <v-dialog max-width="500px">
        <v-form @submit.prevent="submit">
            <v-card style="border-radius: 12px !important;">
                <v-card-title
                    style="font-weight: bold;position:fixed;width: 100%;top: 0;background-color: white;z-index: 100;border-top-left-radius:12px ;border-top-right-radius: 12px;">
                    <h4 style="font-size: 18px;">{{ itemEdit ? "Sửa sản phẩm" : "Tạo mới sản phẩm" }}</h4>
                </v-card-title>
                <v-container class="mt-10" style="background-color: #F7F8FA">
                    <div style="display: block; margin-top: 8px;">
                        <span>Tên sản phẩm </span> <span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="name" placeholder="Nhập tên sản phẩm"
                            :error-messages="nameError" style="background-color: white;" density="compact" single-line
                            hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ nameError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Giá</span><span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="price" placeholder="Nhập giá sản phẩm"
                            :error-messages="priceError" required style="background-color: white;" density="compact"
                            single-line hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ priceError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Số lượng</span><span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="quantity" placeholder="Nhập số lượng sản phẩm"
                            :error-messages="quantityError" required style="background-color: white;" density="compact"
                            single-line hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ quantityError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Mô tả</span><span class="text-blue ml-2">*</span>
                        <v-textarea class="mt-1" v-model="description" placeholder="Nhập mô tả"
                            :error-messages="descriptionError" required style="background-color: white;" density="compact"
                            single-line hide-details variant="outlined"></v-textarea>
                        <span style="color:red">{{ descriptionError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Ảnh sản phẩm</span><span class="text-blue ml-2">*</span><br>
                        <input @change="handleImageChange" type="file" class="custom-file-input mt-1" />
                    </div>
                </v-container>
                <v-card-actions class="pr-4">
                    <v-spacer></v-spacer>
                    <v-btn width="70px" variant="outlined" height="32px"
                        style="font-family: Public Sans;font-size: 14px;margin-right: 16px;" @click="close()"
                        class="text-capitalize" text="Hủy"></v-btn>
                    <v-btn width="105px" height="32px" style="font-family: Public Sans;font-size: 14px;" type="submit"
                        color="#0F60FF" class="text-capitalize" variant="elevated">{{ itemEdit ? "Update" : "Tạo" }}<span
                            class="text-lowercase">{{ itemEdit ? "" : "mới" }}</span></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { ref, watch, onUpdated } from 'vue';
import { productServiceApi } from '@/service/product.api';
import { showSuccessNotification, showWarningsNotification } from '@/common/helper/helpers';
import { useLoadingStore } from '@/store/loading';
const loading = useLoadingStore()



const props = defineProps(['itemEdit'])
const emit = defineEmits(['close', 'loadData'])
watch(() => props.itemEdit, (newValue, oldValue) => {
    resetForm()
    if (props.itemEdit !== null) {
        getProductById(newValue)
    }
});

const getProductById = (item) => {
    console.log(item)
    name.value = item.name;
    price.value = item.price;
    description.value = item.description;
    quantity.value = item.quantity;
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
        .matches(/^[a-zA-Z0-9\sÀ-ỹ]+$/u, 'Tên sản phẩm chỉ được chứa ký tự chữ cái, số và khoảng trắng')
);


const { value: price, errorMessage: priceError } = useField(
    'price',
    yup
        .number()
        .required('Không được bỏ trống')
        .min(0, 'Giá không được nhỏ hơn 0')
        .typeError('Giá phải là một số')
        .max(1000000000, 'Giá phải nhỏ hơn 1 tỷ')
);

const { value: quantity, errorMessage: quantityError } = useField(
    'quantity',
    yup
        .number()
        .required('Không được bỏ trống')
        .integer('Số lượng phải là một số nguyên')
        .min(0, 'Số lượng không được nhỏ hơn 0')
        .typeError('Số lượng phải là một số')
        .max(1000000, 'Số lượng phải nhỏ hơn 1 triệu')
);
const { value: description, errorMessage: descriptionError } = useField(
    'description',
    yup
        .string()
        .required('Không được bỏ trống')
        .min(10, 'Mô tả phải có ít nhất 10 ký tự')
        .max(500, 'Mô tả không được quá 500 ký tự')
);


const submit = handleSubmit(async () => {
    try {
        loading.setLoading(true)
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('price', price.value);
        formData.append('quantity', quantity.value);
        formData.append('description', description.value);
        formData.append('file', imageFile.value);
        if (props.itemEdit == null) {
            const data = await productServiceApi.createProduct(formData);
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
            const data = await productServiceApi.updateProduct(props.itemEdit.id, formData);
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

const empty = () => {
    imageFile.value = null;
    props.itemEdit = null
}


const imageFile = ref(null);
const handleImageChange = (event) => {
    const file = event.target.files[0];
    imageFile.value = file;
};
const close = () => {
    emit('close')
    resetForm()
}

</script>
<style scoped>
.custom-file-input {
    display: inline-block;
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    font-family: Arial, sans-serif;
    color: #333;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.custom-file-input:hover {
    background-color: #e0e0e0;
}

* {
    font-family: Public Sans;
    font-size: 14px;
}
</style>