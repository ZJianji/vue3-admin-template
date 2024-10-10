/**
 * 基础路由
 * @type {Array<RouteItem>}
 */
export const baseRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true, title: '请登陆' },
  }, {
    path: '/:catchAll(.*)',
    name: 'page-404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true, title: '不存在该页面' },
  }, {
    path: '/401',
    name: 'page-401',
    component: () => import('@/views/401.vue'),
    meta: { hidden: true, title: '暂无权限访问' },
  },
];
