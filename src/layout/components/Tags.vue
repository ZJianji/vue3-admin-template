<!--
 * 标签
 * @author: ZJianJi
 * @since: 2024-10-09
 * Tags.vue
 -->
<template>
  <el-scrollbar class="tags-container">
    <div class="tags-list flex">
      <el-tag class="tags-item" :class="{ 'tags-item-active': item.path === route.path }"
        v-for="(item, i) in store.menuTags" :key="i" type="info" :closable="store.menuTags.length > 1"
        @click="onTag(item)" @close="onClose(item, i)">
        {{ item.name }}
      </el-tag>
    </div>
  </el-scrollbar>
</template>
    
<script setup>
import { useMenuStore } from "@/stores/menu";
const store = useMenuStore()

const route = useRoute()
const router = useRouter()


/* 跳转 */
const onTag = (item) => {
  router.push(item.path)
}



/* 关闭 */
const onClose = (item, i) => {
  let list = store.menuTags
  list.splice(i, 1)
  store.setMenuTags(list)
  if (item.path === route.path) {
    if (i === 0) {
      router.push(list[0].path)
    } else if (i > list.length) {
      router.push(list[list.length - 1].path)
    } else {
      router.push(list[i - 1].path)
    }
  }
}

watch(
  () => route,
  (val) => {
    let list = store.menuTags
    const index = list.findIndex(v => v.path === val.path)
    if (index == -1) {
      list.push({
        path: val.path,
        name: val.meta.title
      })
      store.setMenuTags(list)
    }
  },
  { immediate: true, deep: true }
)
</script>
    
<style lang="scss" scoped>
.tags-container {
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-list {
    padding: 3px 15px;

    .tags-item {
      height: 26px;
      line-height: 24px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      border-radius: 0;
      cursor: pointer;

      :deep(.el-icon) {
        font-size: 10px;

      }

      :deep(.el-tag__content) {
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .tags-item+.tags-item {
      margin-left: 5px;
    }

    .tags-item-active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;

      :deep(.el-icon) {
        color: #fff;
      }
    }
  }
}
</style>