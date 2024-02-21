<template>
    <v-dialog max-width="500px">
        <v-form @submit.prevent="submit">
            <v-card>
                <v-card-title
                    style="font-weight: bold;position:fixed;width: 100%;top: 0;background-color: white;z-index: 100;">
                    <h4>{{ idEdit ? "Sửa sản phẩm" : "Thêm mới sản phẩm" }}</h4>
                </v-card-title>
                <v-container class="mt-10" style="background-color: rgb(247, 247, 247);">
                    <v-row>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Tên sản phẩm </span> <span class="text-blue ml-2">*</span>
                            <v-text-field v-model="name" placeholder="Nhập tên sản phẩm" :error-messages="nameError"
                                style="background-color: white;" density="compact" single-line hide-details
                                variant="outlined"></v-text-field>
                            <span style="color:red">{{ nameError }}</span>
                        </v-col>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Giá</span><span class="text-blue ml-2">*</span>
                            <v-text-field v-model="price" placeholder="Nhập giá sản phẩm" :error-messages="priceError"
                                required style="background-color: white;" density="compact" single-line hide-details
                                variant="outlined"></v-text-field>
                            <span style="color:red">{{ priceError }}</span>
                        </v-col>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Số lượng</span><span class="text-blue ml-2">*</span>
                            <v-text-field v-model="quantity" placeholder="Nhập số lượng sản phẩm"
                                :error-messages="quantityError" required style="background-color: white;" density="compact"
                                single-line hide-details variant="outlined"></v-text-field>
                            <span style="color:red">{{ quantityError }}</span>
                        </v-col>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Mô tả</span><span class="text-blue ml-2">*</span>
                            <v-textarea v-model="description" placeholder="Nhập mô tả" :error-messages="descriptionError"
                                required style="background-color: white;" density="compact" single-line hide-details
                                variant="outlined"></v-textarea>
                            <span style="color:red">{{ descriptionError }}</span>
                        </v-col>
                        <v-col cols="12" style="font-size: 13px;">
                            <span>Ảnh sản phẩm</span><span class="text-blue ml-2">*</span><br>
                            <input @change="handleImageChange" type="file" class="custom-file-input" />

                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions class="pr-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="close()" class="text-capitalize" text="Hủy"></v-btn>
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
const loading = useLoadingStore()



const props = defineProps(['idEdit'])
const emit = defineEmits(['close', 'loadData'])
let id = props.idEdit
watch(() => props.idEdit, (newValue, oldValue) => {
    resetForm()
    if (props.idEdit !== null) {
        id = newValue
        getProductById(id)
    }
});



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
);

const { value: quantity, errorMessage: quantityError } = useField(
    'quantity',
    yup
        .number()
        .required('Không được bỏ trống')
        .integer('Số lượng phải là một số nguyên')
        .min(0, 'Số lượng không được nhỏ hơn 0')
        .typeError('Số lượng phải là một số')
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
    // alert(name.value + "   " + price.value)
    loading.setLoading(true)
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('price', price.value);
    formData.append('quantity', quantity.value);
    formData.append('description', description.value);
    formData.append('file', imageFile.value);
    if (id == null) {
        const data = await productServiceApi.createProduct(formData);
        // console.log(data)
        if (!data.success) {
            close()
            loading.setLoading(false)
            showWarningsNotification(data.message)
            empty()
        }
        else {
            close()
            emit('loadData')
            loading.setLoading(false)
            showSuccessNotification("Thêm thành công")
            empty()
        }
    }
    else {
        const data = await productServiceApi.updateProduct(id, formData);
        if (!data.success) {
            close()
            loading.setLoading(false)
            showWarningsNotification(data.message)
            empty()
        }
        else {
            close()
            emit('loadData')
            loading.setLoading(false)
            showSuccessNotification("cập nhật thành công")
            empty()
        }
    }
});

const getProductById = async (id) => {
    try {
        const data = await productServiceApi._getDetail(id);
        name.value = data.data.name;
        price.value = data.data.price;
        description.value = data.data.description;
        quantity.value = data.data.quantity;
    } catch (error) {
        console.error('Error fetching product detail:', error);
    }
}
const empty = () => {
    imageFile.value = null;
    id = null;
    props.idEdit = null
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
<style>
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
</style>