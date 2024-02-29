<template>
    <div>
        <v-card class="mt-0" variant="flat" style="width: 426px;
        height: 476px;
        position: absolute;
        top: 119px;
        left: 507px;
        margin-top: 32px;
        margin-left: 32px;">
            <v-img class="mx-auto mt-0" style="width: 108px; height: 60px;"
                src="https://tse4.mm.bing.net/th?id=OIP.fv5DeUz-OmV84NOdioiodgHaEc&pid=Api&P=0&h=220"></v-img>
            <div class="text-h4 mt-6 mb-0"
                style=" font-family: 'Public Sans',sans-serif; font-size: 32px; font-weight: 600; line-height: 48px; letter-spacing: 0em; text-align: center; margin: 0 auto; display: flex; align-items: center; justify-content: center; color:#1B1B33;">
                Đăng nhập
            </div>
            <v-form id="myForm" @submit.prevent="loginform.handleLogin" @keyup.enter="loginform.handleLogin"
                :style="{ width: '425px', height: '260px' }">
                <div class="text-subtitle-1 text-medium-emphasis" style="margin-top: 32px; width: 425px; height: 60px;">
                    <div
                        style="height: 28px; font-family: 'Public Sans', sans-serif; font-size: 14px; font-weight: bold; color: #464F60;">
                        Email</div>
                    <v-text-field v-model="loginform.email" type="email" :error-messages="loginform.emailError" required
                        density="compact" placeholder="Nhập email" variant="outlined"></v-text-field>
                </div>
                <div class="text-subtitle-1 text-medium-emphasis" style="margin-top: 32px; width: 425px; height: 60px;">
                    <div
                        style="height: 28px; font-family: 'Public Sans', sans-serif; font-size: 14px; font-weight: bold; color: #464F60;">
                        Mật Khẩu</div>
                    <v-text-field v-model="loginform.password" :error-messages="loginform.passwordError"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                        density="compact" placeholder="••••••••••••••" variant="outlined"
                        @click:append-inner="visible = !visible">
                    </v-text-field>
                </div>
                <div class="d-flex justify-space-between align-center mt-10" style=" width: 425px; height: 20px;">
                    <v-checkbox v-model="terms" color="secondary" label="Ghi nhớ Đăng nhập"
                        class="custom-checkbox mr-2"></v-checkbox>
                    <a class="text-caption text-decoration-none text-blue mb-6 custom-link mt-4" style="height: 28px;">
                        Quên mật khẩu?
                    </a>
                </div>
                <v-btn @click="loginform.handleLogin" @enter="loginform.handleLogin" block class="mb-8" color="#0F60FF"
                    style="font-family: 'Public Sans', sans-serif; width: 425px; height: 48px; font-size: 16px; ">
                    <span class="text-capitalize">Đăng</span>
                    <span class="text-lowercase">nhập</span>
                </v-btn>
                <div class="text-center" style=" width: 425px; height: 20px;">
                    <a class="text-decoration-none text-center"
                        style="font-family: 'Public Sans', sans-serif; font-size: 14px; color: #5A5C6F;">Bạn chưa có tài
                        khoản?</a>

                    <a class="text-decoration-none text-center"
                        style="font-family: 'Public Sans', sans-serif; font-size: 14px; color:#0F60FF; font-weight: bold;">
                        Đăng ký?
                    </a>
                </div>
            </v-form>
        </v-card>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { userLoginForm } from './loginform.ts'
const loginform = reactive(userLoginForm());
const visible = ref(false)
const terms = ref('')
</script>
<style>
.icon-field .v-icon {
    width: 4.98px;
    height: 4.98px;
}

.custom-checkbox .v-label {
    font-family: 'Public Sans', sans-serif;
    font-size: 14px;
    font-weight: bold;
    color: black;
}

.custom-link {
    font-family: 'Public Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #0F60FF;
}

.custom-checkbox input[type="checkbox"] {
    width: 16px;
    height: 16px;
}

.custom-checkbox .v-input--selection-controls__ripple {
    width: 16px;
    height: 16px;
    border-radius: 4px;
}
</style>









