import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from '@/pages/pageNotFound/index.vue';

// 路由meta类型声明
declare module 'vue-router' {
  interface RouteMeta {
    // 页面标题
    title?: string;
  }
}

// 自动导入modules下所有路由
const routeFiles = import.meta.glob('@/router/modules/*.ts', { eager: true });
function getAllRouteFiles() {
  const routes: RouteRecordRaw[] = [];
  Object.entries(routeFiles).forEach(item => routes.push(...(item[1] as { default: RouteRecordRaw[] }).default));
  return routes;
}

// 路由声明
const routes: RouteRecordRaw[] = [
  // 设置首页
  {
    path: '/',
    redirect: '/home',
  },
  ...getAllRouteFiles(),
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: PageNotFound,
    meta: {
      title: '404页面丢失',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savePosition) => {
    if (savePosition) {
      return savePosition;
    }
    else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ left: 0, top: 0 });
        }, 500);
      });
    }
  },
});

// 路由前置守卫
// router.beforeEach((to) => {});

// 路由后置守卫
// router.afterEach((to) => {});

export default router;
