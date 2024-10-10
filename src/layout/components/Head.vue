<!--
 * 头部
 * @author: ZJianJi
 * @since: 2024-09-25
 * Head.vue
 -->
<template>
  <div class="head-container" :style="{ 'padding-left': menuStore.leftMenu }">
    <div class="navbar fvertical fbetween">
      <Breadcrumb />
      <Dropdown />
    </div>
    <Tags />
  </div>
</template>
    
<script setup>
import Breadcrumb from './Breadcrumb.vue'
import Dropdown from './Dropdown.vue'
import Tags from './Tags.vue'
import { useMenuStore } from '@/stores/menu'
const menuStore = useMenuStore()
</script>
    
<style lang="scss" scoped>
.head-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transition: all .3s;
  z-index: 99;
  background-color: #fff;

  .navbar {
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
}
</style>