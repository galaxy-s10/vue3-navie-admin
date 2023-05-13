import { AttachOutline } from '@vicons/ionicons5';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from '../utils';

import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    name: 'nest',
    path: '/nest',
    component: Layout,
    meta: {
      title: '多级嵌套',
      icon: renderIcon(AttachOutline),
      sort: ROUTE_SORT.nest,
    },
    children: [
      {
        name: 'nest-1',
        path: '/nest/nest-1',
        meta: {
          title: 'nest-1',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
        children: [
          {
            name: 'nest-1-1',
            path: '/nest/nest-1/nest-1',
            meta: {
              title: 'nest-1-1',
            },
            children: [
              {
                name: 'nest-1-1-1',
                path: '/nest/nest-1/nest-1/nest-1',
                meta: {
                  title: 'nest-1-1-1',
                },
                children: [
                  {
                    name: 'nest-1-1-1-1',
                    path: '/nest/nest-1/nest-1/nest-1/nest-1',
                    component: () =>
                      import(
                        '@/views/nest/nest-1/nest-1-1/nest-1-1-1/nest-1-1-1-1/index.vue'
                      ),
                    meta: {
                      title: 'nest-1-1-1-1',
                    },
                  },
                  {
                    name: 'nest-1-1-1-2',
                    path: '/nest/nest-1/nest-1/nest-1/nest-2',
                    component: () =>
                      import(
                        '@/views/nest/nest-1/nest-1-1/nest-1-1-1/nest-1-1-1-2/index.vue'
                      ),
                    meta: {
                      title: 'nest-1-1-1-2',
                    },
                  },
                ],
              },
              {
                name: 'nest-1-1-2',
                path: '/nest/nest-1/nest-1/nest-2',
                meta: {
                  title: 'nest-1-1-2',
                  roles: [ROUTE_ROLES.SUPER_ADMIN],
                },
                component: () =>
                  import('@/views/nest/nest-1/nest-1-1/nest-1-1-2/index.vue'),
              },
            ],
          },
          {
            name: 'nest-1-2',
            path: '/nest/nest-1/nest-2',
            component: () => import('@/views/nest/nest-1/nest-1-2/index.vue'),
            meta: {
              title: 'nest-1-2',
            },
          },
        ],
      },
      {
        name: 'nest-2',
        path: '/nest/nest-2',
        meta: {
          title: 'nest-2',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
        component: () => import('@/views/nest/nest-2/index.vue'),
      },
    ],
  },
];
