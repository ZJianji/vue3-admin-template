<!--
 * 菜单
 * @author: ZJianJi
 * @since: 2024-09-25
 * Menu.vue
 -->
<template>
  <div class="menu-container" :style="{ width: store.leftMenu }">
    <div class="title fvertical">
      <img class="logo" src="../../assets/logo.svg" alt="logo" />
      <span v-if="!store.isHideMenu"> {{ 'Element Plus Admin' }} </span>
    </div>
    <el-menu :default-active="menuActive" :collapse-transition="false" :collapse="store.isHideMenu" @select="onSelect">
      <MenuItem :child="item" v-for="item in menuRoute" :key="item.path" />
    </el-menu>
  </div>
</template>
    
<script setup>
import MenuItem from "./MenuItem.vue"
import { menuRoute } from "@/router/menuRoute";
import { useMenuStore } from '@/stores/menu'
const store = useMenuStore()

const route = useRoute()
const menuActive = ref(route.path)

const router = useRouter()
const onSelect = (url) => {
  router.push(url)
}

watch(
  () => route.path,
  (path) => {
    menuActive.value = path
  },
  { immediate: true, deep: true }
)


</script>
    
<style lang="scss" scoped>
.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 210px;
  height: 100vh;
  background: #304156;
  transition: width .3s;
  z-index: 100;


  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    background: #2b2f3a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .logo {
      width: 40px;
      height: 32px;
      margin-right: 5px;
    }
  }

  .el-menu {
    border: none;
  }

  .el-menu--collapse {
    width: 60px;
  }
}
</style>

<style lang="scss">
.el-menu--popup {
  padding: 0 !important;

}
</style>