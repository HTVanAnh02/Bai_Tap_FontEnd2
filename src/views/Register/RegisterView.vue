<template>
    <div>
        <v-card class="mt-0" variant="flat" style="width: 426px;
           height: 550px;
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);">
            <v-img class="mx-auto mt-0" style="width: 108px; height: 60px;"
                src="https://tse4.mm.bing.net/th?id=OIP.fv5DeUz-OmV84NOdioiodgHaEc&pid=Api&P=0&h=220"></v-img>
            <div class="text-h4 mt-6 mb-0"
                style=" font-family: 'Public Sans',sans-serif; font-size: 32px; font-weight: 600; line-height: 48px; letter-spacing: 0em; text-align: center; margin: 0 auto; display: flex; align-items: center; justify-content: center; color:#1B1B33;">
                Đăng ký
            </div>
            <v-form id="myForm" @submit.prevent="registerform.handleRegister" @keyup.enter="registerform.handleRegister"
                :style="{ width: '425px', height: '260px' }">
                <div class="text-subtitle-1 text-medium-emphasis" style="margin-top: 32px; width: 425px; height: 60px;">
                    <div
                        style="height: 28px; font-family: 'Public Sans', sans-serif; font-size: 14px; font-weight: bold; color: #464F60;">
                        Email</div>
                    <v-text-field v-model="registerform.email" type="email" :error-messages="registerform.emailError" required
                        density="compact" placeholder="Nhập email" variant="outlined"></v-text-field>
                </div>
                <div class="text-subtitle-1 text-medium-emphasis" style="margin-top: 32px; width: 425px; height: 60px;">
                    <div
                        style="height: 28px; font-family: 'Public Sans', sans-serif; font-size: 14px; font-weight: bold; color: #464F60;">
                        Mật Khẩu</div>
                    <v-text-field v-model="registerform.password" :error-messages="registerform.passwordError"
                        :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" :type="visible ? 'text' : 'password'"
                        density="compact" placeholder="••••••••••••••" variant="outlined"
                        @click:append-inner="visible = !visible">
                    </v-text-field>
                </div>
                <div class="text-subtitle-1 text-medium-emphasis" style="margin-top: 32px; width: 425px; height: 60px;">
                    <div
                        style="height: 28px; font-family: 'Public Sans', sans-serif; font-size: 14px; font-weight: bold; color: #464F60;">
                         Nhập Lại Mật Khẩu</div>
                    <v-text-field v-model="registerform.confirmPassword" :error-messages="registerform.confirmPasswordError"
                        :append-inner-icon="visible1 ? 'mdi-eye' : 'mdi-eye-off'" :type="visible1 ? 'text' : 'password'"
                        density="compact" placeholder="••••••••••••••" variant="outlined"
                        @click:append-inner="visible1 = !visible1">
                    </v-text-field>
                </div>
                <v-btn @click="registerform.handleRegister" @enter="registerform.handleRegister" block class="mb-8" color="#0F60FF"
                    style="margin-top: 40px; font-family: 'Public Sans', sans-serif; width: 425px; height: 48px; font-size: 16px; ">
                    <span class="text-capitalize">Đăng</span>
                    <span class="text-lowercase">ký</span>
                </v-btn>
                <div class="text-center" style=" width: 425px; height: 20px;">
                    <a class="text-decoration-none text-center"
                        style="font-family: 'Public Sans', sans-serif; font-size: 14px; color: #5A5C6F;">Bạn đã có tài
                        khoản?</a>
                    <router-link to="/login" class="text-decoration-none text-center"
                        style="font-family: 'Public Sans', sans-serif; font-size: 14px; color:#0F60FF; font-weight: bold;">
                        Đăng nhập?
                    </router-link>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { userRegisterForm } from './register';
const registerform = reactive(userRegisterForm());
const visible = ref(false)
const visible1 = ref(false)

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
./login.js