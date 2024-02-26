<template>
    <v-app>
        <v-layout>
            <v-navigation-drawer @click.stop="rail = !rail" v-model="drawer" :rail="rail" class="navigation_drawer" permanent>
                <v-toolbar style="background-color: white;">
                    <v-row>
                        <v-col cols="8">
                            <v-toolbar-title @click.stop="rail = !rail" class="ma-3">
                                <v-img width="250"
                                    src="https://res.cloudinary.com/dgtjdhrnq/image/upload/v1705460127/logo1_adshdl.png"></v-img>
                            </v-toolbar-title>
                        </v-col>
                        <v-col class="text-center" cols="4">
                            <img @click.stop="rail = !rail" style="margin-top: 18%;" src="../assets/indent.png" alt="">
                        </v-col>
                    </v-row>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list density="compact" nav>
                    <v-list-item v-show="this.rail == false" class="text-uppercase" style="opacity: 0.6;font-size: 13px;">Quản
                        lý sản phẩm</v-list-item>
                    <v-list-item prepend-icon="mdi-apps" title="Sản phẩm" value="Sản phẩm" to='product'></v-list-item>
                    <v-list-item prepend-icon="mdi-account-group" title="User" value="User" to='user'></v-list-item>
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
}
</style>