

/**
 * 菜单
 * @type {Array<RouteItem>}
 */
export const menuRoute = [
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页', icon: 'houses' },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/elementPlusCrx',
    name: 'elementPlusCrx',
    redirect: '/table',
    meta: { title: 'ElementPlusCrx', icon: 'example' },
    children: [
      {
        path: '/table',
        name: 'table',
        meta: { title: '表格' },
        component: () => import('@/views/ElementPlusCrx/table/index.vue')
      },
      {
        path: '/form',
        name: 'form',
        meta: { title: '表单' },
        component: () => import('@/views/ElementPlusCrx/form/index.vue')
      },
    ]
  },
  {
    path: '/onlinePreview',
    name: 'onlinePreview',
    meta: { title: '在线预览', icon: 'houses' },
    component: () => import('@/views/onlinePreview/index.vue'),
  },
  {
    path: '/nested',
    name: 'nested',
    redirect: '/nested/menu-1',
    meta: { title: '多级菜单嵌套', icon: 'tree' },
    children: [
      {
        path: '/nested/menu-1',
        name: 'nested/menu-1',
        meta: { title: '菜单 1', icon: 'tree' },
        children: [
          {
            path: '/nested/menu-1-1',
            name: 'nested/menu-1-1',
            meta: { title: '菜单 1-1111111111111111111111111111', },
            component: () => import('@/views/menu/menu-1-1.vue')
          },
        ]
      },
      {
        path: '/nested/menu-2',
        name: 'nested/menu-2',
        meta: { title: '菜单 2', },
        component: () => import('@/views/menu/menu-2.vue')
      }
    ]
  },
];