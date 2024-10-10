<!--
 * 表格
 * @author: ZJianJi
 * @since: 2024-10-10
 * index.vue
 -->
<template>
  <div class="table-container">
    <AgelTable class="table" style="width: 100%;" v-bind="tableData" v-model:page="tableData.page">
      <template #slot-btn="{ row }">
        <el-button type="primary" link @click="onEdit"> 编辑 </el-button>
        <el-button type="danger" link @click="onEdit"> 删除 </el-button>
        <el-button type="primary" link @click="onEdit"> 查看 </el-button>
      </template>
    </AgelTable>

    <FormDialog ref="formDialog" />
  </div>
</template>
    
<script setup>
import FormDialog from "./components/FormDialog";

const tableData = reactive({
  loading: false,
  border: false,
  data: [],
  height: '440',
  page: {
    sortOrder: null,
    sortProp: '',
    currentPage: 1,
    pageSize: 10,
    total: 0,
    layout: 'total,prev, pager, next',
    background: true,
  },
  columns: [
    { label: '单位', prop: 'name' },
    { label: '部门', prop: 'depInvolved' },
    { label: '申报', prop: 'problemRegisterDate', width: '160' },
    { label: '状态', prop: 'status', width: '160' },
    { label: '数量', prop: 'times', width: '160' },
    { label: '操作', slot: 'slot-btn', fixed: 'right', width: '170', align: 'center' },
  ],
  request: async () => {
    tableData.loading = true
    tableData.data = [
      { name: '123123' },
      { name: '123123' },
      { name: '123123' },
      { name: '123123' },
      { name: '123123' },
      { name: '123123' },
      { name: '123123' },
      { name: '123123' },
    ]
    tableData.loading = false
  }
})

tableData.request()

const formDialog = ref(null)

const onEdit = () => {
  formDialog.value.initData({
    data: { name: '' },
    title: '编辑'
  })
}
</script>
    
<style lang="scss" scoped>
.table-container {}
</style>