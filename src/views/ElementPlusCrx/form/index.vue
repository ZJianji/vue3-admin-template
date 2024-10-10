<!--
 * 表单
 * @author: ZJianJi
 * @since: 2024-10-10
 * index.vue
 -->
<template>
  <div class="form-container">
    <ElForm :model="form.model" label-width="auto">
      <AgelFormGrid ref="formRef" :items="form.items" :span="24"></AgelFormGrid>
    </ElForm>
    <div class="btn">
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
  </div>
</template>
    
<script setup>
const formData = ref({})
const stateOptions = [
  { value: '1', label: '待解决' },
  { value: '2', label: '已解决' },
]
const form = computed(() => ({
  model: formData,
  items: [
    {
      prop: 'name',
      label: '问题：',
      required: true,
      vmodel: '.trim',
      attrs: {
        placeholder: '请输入问题',
        size: 'large',
      },
      span: 12
    },
    {
      prop: 'name',
      label: '时间：',
      slot: 'el-date-picker',
      required: true,
      attrs: {
        placeholder: '请选择申报时间',
        size: 'large',
      },
      span: 12
    },
    {
      prop: 'name',
      label: '状态：',
      required: true,
      slot: 'agel-select',
      attrs: {
        options: stateOptions,
        placeholder: '请输入问题状态',
        size: 'large',
      },
      span: 12
    },

    {
      prop: 'name',
      label: '单位：',
      vmodel: '.trim',
      required: true,
      attrs: {
        placeholder: '请输入责任单位',
        size: 'large',
      },
      span: 12
    },
    {
      prop: 'name',
      label: '数量：',
      vmodel: '.trim',
      required: true,
      slot: 'el-input-number',
      attrs: {
        placeholder: '请输入问题次数',
        size: 'large',
        min: 1,
      },
      span: 12
    },
    {
      prop: 'name',
      label: '部门：',
      required: false,
      attrs: {
        placeholder: '请输入涉及部门',
        size: 'large',
      },
      span: 12
    },
    {
      prop: 'name',
      label: '来源：',
      required: false,
      attrs: {
        placeholder: '请输入问题来源',
        size: 'large',
        disabled: true,
      },
      span: 12
    },
    {
      prop: 'name',
      label: '内容：',
      required: false,
      attrs: {
        type: 'textarea',
        placeholder: '请输入问题内容',
        size: 'large',
        rows: 3,
      },
      span: 24
    },
  ]
}))

const formRef = ref(null)
const onSave = () => {
  formRef.value.validate((valid) => {
    if (valid) {

    }
  })
}
</script>
    
<style lang="scss" scoped>
.form-container {
  .btn {
    text-align: center;
  }
}
</style>