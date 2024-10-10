import './styles/index.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import ElementPlusCrx from 'element-plus-crx'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import svgIcon from '@/components/SvgIcon/index.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app
  .component('svg-icon', svgIcon)
  .use(createPinia())
  .use(ElementPlus, { locale: zhCn, })
  .use(ElementPlusCrx)
  .use(router)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')

