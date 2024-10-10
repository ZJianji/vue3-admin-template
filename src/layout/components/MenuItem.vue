<!--
 * 菜单项
 * @author: ZJianJi
 * @since: 2024-09-26
 * MenuItem.vue
 -->
<template>
  <el-menu-item class="menu-item" :index="child.path" v-if="!child.children && !child.meta.hidden">
    <SvgIcon class="svg" :name="child.meta.icon" v-if="child.meta.icon" />
    <template #title> <span class="title ellipsis">{{ child.meta.title }}</span></template>
  </el-menu-item>

  <el-sub-menu class="sub-menu-item" :index="child.path" v-if="child.children && !child.meta.hidden">
    <template #title>
      <SvgIcon class="svg" :name="child.meta.icon" />
      <span class="title ellipsis">{{ child.meta.title }}</span>
    </template>
    <MenuItem v-for="item in child.children" :key="item.name" :child="item" />
  </el-sub-menu>
</template>
    
<script setup>
const props = defineProps({
  child: {
    type: Object,
    default: () => ({}),
  },
})
</script>


    
<style lang="scss" scoped>
.menu-item {
  height: 50px;
  background-color: rgb(48, 65, 86);

  &:hover {
    background-color: rgb(38, 52, 69);
  }

  .title {
    color: rgb(191, 203, 217);
  }

  .svg {
    min-width: 14px;
    width: 14px;
    white-space: nowrap;
    margin-right: 10px;
    color: rgb(191, 203, 217);
  }

  &.is-active {
    .title {
      color: #409eff;
    }

    .svg {
      color: #409eff;
    }
  }
}

.sub-menu-item {
  background-color: rgb(48, 65, 86);

  :deep(.el-sub-menu__title) {
    .title {
      color: rgb(191, 203, 217) !important;
    }

    .svg {
      color: rgb(191, 203, 217) !important;
    }

    &:hover {
      background-color: rgb(38, 52, 69);
    }
  }

  :deep(.el-icon) {
    color: rgb(191, 203, 217);
  }

  .title {
    color: rgb(191, 203, 217);
  }

  .svg {
    min-width: 14px;
    margin-right: 10px;
    color: rgb(191, 203, 217);
  }

  .menu-item {
    background-color: #1f2d3d;

    &:hover {
      background-color: #001528;
    }
  }

  .sub-menu-item {
    background-color: #1f2d3d;

    :deep(.el-sub-menu__title) {

      &:hover {
        background-color: #001528;
      }
    }
  }
}
</style>

