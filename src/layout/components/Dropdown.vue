<!--
 * 头像下拉
 * @author: ZJianJi
 * @since: 2024-09-25
 * Dropdown.vue
 -->
<template>
  <div class="dropdown-container">
    <el-dropdown>
      <div class="dropdown flex">
        <img class="avatar"
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item, index) in dropdownList" :key="index">
            <div @click="onLick(item)">{{ item.name }}</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
    
<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'

const { setToken } = useUserStore()
const { setMenuTags } = useMenuStore()
const dropdownList = ref([
  { name: '个人中心', url: '/' },
  { name: '首页', url: '/' },
  { name: '退出登录', url: '/login' },
])

const router = useRouter()
const onLick = (item) => {
  if (item.url === '/login') {
    ElMessage.success('退出成功!')
    setToken('')
    setMenuTags([])
  }
  router.push(item.url)
}
</script>
    
<style lang="scss" scoped>
.dropdown-container {
  margin-right: 20px;
  cursor: pointer;

  .dropdown {
    align-items: flex-end;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
}
</style>