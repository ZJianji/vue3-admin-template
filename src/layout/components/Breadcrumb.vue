<!--
 * new page
 * @author: ZJianJi
 * @since: 2024-09-25
 * Breadcrumb.vue
 -->
<template>
  <div class="breadcrumb-container fvertical">
    <div class="svg-box" @click="onOpen">
      <svg-icon class="svg" :name="isOpen ? 'hamburger-opened' : 'hamburger-closed'" />
    </div>
    <el-breadcrumb separator="/">
      <TransitionGroup name="list" tag="ul">

        <el-breadcrumb-item v-for="(item, i) in breadcrumbList" :key="i"
          :to="item.redirect ? item.redirect : route.path">{{
            item.name
          }}</el-breadcrumb-item>
      </TransitionGroup>

    </el-breadcrumb>
  </div>
</template>
    
<script setup>
import { useMenuStore } from '@/stores/menu'
const { isHideMenu, setOpenMenu } = useMenuStore()

const isOpen = ref(isHideMenu)
const route = useRoute()

const breadcrumbList = computed(() => {

  const matched = [...route.matched]
  matched.shift()
  return matched.map(el => {
    return {
      name: el.meta.title,
      path: el.path
    }
  })
})

const onOpen = () => {
  isOpen.value = !isOpen.value
  setOpenMenu(isOpen.value)
}
</script>
    
<style lang="scss" scoped>
.breadcrumb-container {
  .svg-box {
    margin-right: 10px;
    padding: 15px;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }

    .svg {
      width: 20px;
      height: 20px;
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>