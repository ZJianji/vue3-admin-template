<!--
 * 自定义节点
 * @author: ZJianJi
 * @since: 2024-12-17
 * node.vue
 -->
<template>
  <div class="demo-node">
    <p class="name ellipsis">{{ flowNodeData.name }}</p>
    <p class="desc ellipsis">{{ flowNodeData.desc }}</p>
    <!-- <p class="department ellipsis">深圳市水务局</p> -->
  </div>
</template>
    
<script setup>
import { useFlowStore } from '@/stores/flow'

const { flowNodeData } = useFlowStore()

</script>
    
<style lang="scss" scoped>
.demo-node {
  width: 260px;
  height: 94px;
  padding: 12px 12px 8px 12px;
  background: #ffffff;
  border: 1.5px solid #5a5e62;
  border-radius: 4px;
  box-sizing: border-box;

  .name {
    position: relative;
    font-size: 18px;
    font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-500;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
  }

  .desc {
    margin-top: 8px;
    font-size: 16px;
    font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-400;
    color: #333333;
    line-height: 20px;
  }

  .department {
    margin-top: 6px;
    font-size: 16px;
    font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-400;
    color: #333333;
    line-height: 20px;
  }

}
</style>