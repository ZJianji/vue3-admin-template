<!--
 * 布局
 * @author: ZJianJi
 * @since: 2024-09-25
 * layout.vue
 -->
<template>
  <div class="layout-contianer">
    <!-- 菜单 -->
    <Menu />

    <!-- 右侧 -->
    <div class="layout-left" :style="{ 'margin-left': menuStore.leftMenu }">

      <Head />
      <div class="layout-main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component class="main" :is="Component" />
          </transition>
        </router-view>
      </div>

    </div>
  </div>
</template>
    
<script setup>
import Menu from './components/Menu.vue'
import Head from './components/Head.vue'
import { useMenuStore } from '@/stores/menu'
const menuStore = useMenuStore()
const route = useRoute()
const cacheList = ref([])
</script>
    
<style lang="scss" scoped>
.layout-contianer {

  .layout-left {
    transition: all .3s;
  }

  .layout-main {
    position: relative;
    height: 100vh;
    padding: 95px 15px 15px 15px;
    overflow: auto;
    background-color: #eee;
  }

  .main {
    min-height: calc(100vh - 110px);
    padding: 15px;
    background-color: #fff;
  }

  .fade-leave-active,
  .fade-enter-active {
    transition: all .5s !important;
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>