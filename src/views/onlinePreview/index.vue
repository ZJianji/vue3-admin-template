<!--
 * new page
 * @author: ZJianJi
 * @since: 2024-10-10
 * index.vue
 -->
<template>
  <div class="online-preview">
    <el-select v-model="fileUrl" placeholder="选择文件" :teleported="false" @change="changeFile">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <div class="offece-box" v-loading="loading">
      <!-- pdf展示 -->
      <VueOfficePdf :src="url" style="width: 100%;height: 100%;" @rendered="rendered" @error="errorHandler"
        v-if="suffix === 'pdf'" />

      <!-- docx展示 -->
      <VueOfficeDocx :src="url" :ignoreWidth="false" :ignoreHeight="true" style="width: 100%;height: 100%;"
        @rendered="rendered" @error="errorHandler" v-if="suffix === 'docx'" />

      <!-- excel展示 -->
      <VueOfficeExcel :src="url" style="width: 100%;height: 500px;" @rendered="rendered" @error="errorHandler"
        v-if="suffix === 'xlsx'" />

    </div>
  </div>
</template>
    
<script setup>
//引入VueOfficeDocx组件
import VueOfficePdf from '@vue-office/pdf'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/docx/lib/index.css'
//引入相关样式
import '@vue-office/excel/lib/index.css'

const loading = ref(false)
const fileUrl = ref('')
const url = ref('')
const options = ref([
  {
    label: 'pdf',
    value: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf',
  },
  {
    label: 'docx',
    value: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx',
  },
  {
    label: 'excel',
    value: 'http://static.shanhuxueyuan.com/demo/excel.xlsx',
  },

])

const suffix = computed(() => {
  return fileUrl.value.substring(fileUrl.value.lastIndexOf(".") + 1)
})

const changeFile = () => {
  loading.value = true
  if (["pdf", "docx", "xlsx"].includes(suffix.value)) {
    nextTick(() => {
      url.value = fileUrl.value
    })
  }

  if (suffix.value == 'xlsx') {
    setTimeout(() => {
      rendered()
    }, 1000);
  }
}

function rendered() {
  loading.value = false
  console.log("渲染完成")
}
function errorHandler() {
  console.log("渲染失败")
}
</script>
    
<style lang="scss" scoped>
.online-preview {
  .el-select {
    width: 300px;
  }

  .offece-box {
    position: relative;
    z-index: 1;
    margin-top: 30px;
  }

  :deep(.vue-office-docx) {

    section.docx {
      width: 100% !important;
    }

    .docx-wrapper {
      padding: 0;
    }
  }

  :deep(.vue-office-pdf) {
    canvas {
      // top: 0 !important;
      width: 100% !important;
    }

    .vue-office-pdf-wrapper {
      padding: 0 !important;
    }
  }
}
</style>