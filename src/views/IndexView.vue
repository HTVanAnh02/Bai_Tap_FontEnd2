<template>
    <v-app>
        <v-layout>
            <v-navigation-drawer @click.stop="rail = !rail" v-model="drawer" :rail="rail" class="navigation_drawer"
                permanent>
                <v-toolbar style="background-color: white;">
                    <v-row>
                        <v-col cols="8">
                            <v-toolbar-title @click.stop="rail = !rail" class="ma-3">
                                <v-img width="250"
                                    src="https://res.cloudinary.com/dgtjdhrnq/image/upload/v1705460127/logo1_adshdl.png"></v-img>
                            </v-toolbar-title>
                        </v-col>
                        <v-col cols="3" class="text-right">
                            <img @click.stop="rail = !rail"
                                src="https://res.cloudinary.com/dgtjdhrnq/image/upload/v1708508357/indent_oymmcm.png"
                                class="hover-img">
                        </v-col>
                    </v-row>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list density="compact" nav>
                    <v-list-item v-show="this.rail == false" class="text-uppercase"
                        style="opacity: 0.6;font-size: 13px;">Quản lý sản phẩm</v-list-item>
                    <v-list-item to='product'>
                        <div style="display: flex; align-items: flex-start;">
                            <img src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709198095/box_fcjahg.png"
                                style="width: 22px; height: 22px;"><img>
                            <div
                                style="width: 170px; height: 22px; margin-left: 8px; font-family: Public Sans, sans-serif; font-size: 15px; font-weight: 400; line-height: 22px; color: #8B909A;">
                                Sản Phẩm
                            </div>
                        </div>
                    </v-list-item>
                    <v-list-item to='user'>
                        <div style="display: flex; align-items: flex-start;">
                            <img src="https://res.cloudinary.com/dyo42vgdj/image/upload/v1709197932/users_ru17it.jpg"
                                style="width: 22px; height: 22px;"><img>
                            <div
                                style="width: 170px; height: 22px; margin-left: 8px; font-family: Public Sans, sans-serif; font-size: 15px; font-weight: 400; line-height: 22px; color: #8B909A;">
                                User
                            </div>
                        </div>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar class="px-4" color="rgb(247, 247, 247)" :elevation="0" rounded="0">
                <h3 class="reposive">Danh sách sản phẩm</h3>
                <v-spacer></v-spacer>
                <v-btn>
                    <v-badge content="4" color="red">
                        <v-icon>mdi-bell</v-icon>
                    </v-badge>
                </v-btn>
                <v-avatar>
                    <v-img src="../assets/img/anh.jpg" alt="Anh"></v-img>
                </v-avatar>
            </v-app-bar>
            <v-main style="background-color: rgb(247, 247, 247);min-height: 100vh;">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-app>
</template>

<script>
import NavigrationDrawerVue from '@/components/NavigrationDrawer.vue'
export default {
    components: { NavigrationDrawerVue },
    data() {
        return {
            drawer: true,
            rail: false,
        }
    }
}
</script>

<style scoped>
@media (min-width: 1200px) {
    .reposive {
        margin-left: 0.2%;
    }
}</style>