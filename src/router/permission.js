import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

/**
 * 初始化权限管理
 * @param {VueRouter} vueRouter
 * @param {object} options 路由配置项
 */
export function initPermission(router) {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    const { token } = useUserStore()

    if (!token) {
      if (to.path === '/login') {
        next()
        NProgress.done();
      } else {
        ElMessage.warning('请先登录！')
        next('/login')
        NProgress.done();
      }
    } else {
      if (to.path === '/login') {
        next('/')
        NProgress.done();
      } else {
        next()
        NProgress.done();
      }
    }

  })
}
