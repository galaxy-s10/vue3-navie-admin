import { CartOutline, KeyOutline, SettingsOutline } from '@vicons/ionicons5';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

// 异步路由
export const routes: RouteRecordRaw[] = [
  {
    name: 'setting',
    path: '/setting',
    component: Layout,
    meta: {
      title: '设置',
      icon: renderIcon(SettingsOutline),
      sort: ROUTE_SORT.setting,
    },
    children: [
      {
        name: 'settingFrontend',
        path: '/setting/frontend',
        meta: {
          title: '前台设置',
          icon: renderIcon(CartOutline),
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
        component: () => import('@/views/setting/frontend/index.vue'),
      },
      {
        name: 'settingAccount',
        path: '/setting/account',
        component: () => import('@/views/setting/account/index.vue'),
        meta: {
          title: '账号设置',
          icon: renderIcon(KeyOutline),
        },
      },
    ],
  },
];
