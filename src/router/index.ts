
import { createRouter, createWebHistory, NavigationGuardWithThis, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import { PageName, Role } from '../common/contant/contants';
import authMiddleware from './authMiddleware';
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middleware';
import LoginViewVue from '@/views/Login/LoginView.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: PageName.LOGIN_PAGE,
    component: LoginViewVue,
    meta: {
      public: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      public: true,
    },
  },
  {
    path: '/index',
    name: PageName.BLOG,
    component: () => import('../views/BlogView.vue'),
    meta: {
      public: true,
    },
  },
  {
    path: '/register',
    name: PageName.REGISTER_PAGE,
    component: () => import('../views/Register/RegisterView.vue'),
    meta: {
      public: true,
    },
  },
  {
    path: '/home',
    name: PageName.TRANG_CHU,
    component: () => import('../views/HomeView.vue'),
    meta: {
      public: true,
    },
  },
  
  {
    path: '/404',
    name: PageName.NOT_FOUND_PAGE,
    component: () => import('../components/errors/NotFound.vue')
  },
  {
    path: '/admin',
    name: PageName.ADMIN,
    component: () => import('../views/NarbarView.vue'),
    children: [
      {
        path: 'product',
        name:PageName.ADMIN_PRODUCT,
        component: () => import('../views/Admin/Product/ProductView.vue'),
        meta: {
          role:Role.ADMIN,
          public:false,
        },
      },
      {
        path: 'user',
        name:PageName.ADMIN_USER,
        component: () => import('../views/Admin/User/UserView.vue'),
        meta: {
          role:Role.ADMIN,
          public:false,
        },
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(
  VueRouteMiddleware({
    [GLOBAL_MIDDLEWARE_NAME]: authMiddleware,
  }) as NavigationGuardWithThis<unknown>,
);

export default router
