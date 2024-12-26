<!--
 * new page
 * @author: ZJianJi
 * @since: 2024-12-17
 * BpmnNodePanel.vue
 -->
<template>
  <div class="bpmn-node-panel">
    <div class="tree tree-1" :style="{ height: treeH1 + 'px' }">
      <div class="tree-title" @click="isExpand1 = !isExpand1">
        <img class="tree-title-icon" :class="{ 'tree-title-icon-ac':  isExpand1 }" src="@/assets/flowChart/drop-down.png" alt="" />
        <p>项目1</p>
      </div>
      <ul class="tree-list">
        <li class="tree-item" v-for="(item, i) in treeList1" :key="i" @mousedown="handleDrop(item,1)">
          <p class="ellipsis"> {{ item.name }}</p>
        </li>
      </ul>
    </div>

    <div class="tree tree-2" :style="{ height: treeH2 + 'px' }">
      <div class="tree-title" @click="isExpand2 = !isExpand2">
        <img class="tree-title-icon" :class="{ 'tree-title-icon-ac':  isExpand2 }" src="@/assets/flowChart/drop-down.png" alt="" />
        <p>项目2</p>
      </div>
      <ul class="tree-list">
        <li class="tree-item" v-for="(item, i) in treeList2" :key="i" @mousedown="handleDrop(item,2)">
          <div class="tree-item-name">
            <p class="tree-item-name-txt ellipsis">{{ item.name }}</p>
            <img class="tree-item-name-img" src="@/assets/flowChart/tree-item-icon-2.png" alt="" />
          </div>
          <p class="tree-item-desc ellipsis">{{ item.desc }}</p>
        </li>
      </ul>
    </div>

    <div class="tree tree-3" :style="{ height: treeH3 + 'px' }">
      <div class="tree-title" @click="isExpand3 = !isExpand3">
        <img class="tree-title-icon" :class="{ 'tree-title-icon-ac':  isExpand3 }" src="@/assets/flowChart/drop-down.png" alt="" />
        <p>项目3</p>
      </div>
      <ul class="tree-list">
        <li class="tree-item" v-for="(item, i) in treeList3" :key="i" @mousedown="handleDrop(item,3)">
          <div class="tree-item-name">
            <p class="tree-item-name-txt ellipsis">{{ item.name }}</p>
            <!-- <img class="tree-item-name-img" src="@/assets/flowChart/tree-item-icon-2.png" alt="" /> -->
          </div>
          <p class="tree-item-desc ellipsis">{{ item.desc }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
    
<script setup>
import { useFlowStore } from '@/stores/flow'
const props = defineProps({
  lf: {
    type: Object,
    default: () => ({})
  }
})

const { flowNodeData, setFlowNodeData } = useFlowStore()



const treeList1 = ref([
  {
    id: 1,
    name: '工程11111111111111111111111111111'
  },
  {
    id: 2,
    name: '工程2'
  },
  {
    id: 3,
    name: '工程2'
  },
  {
    id: 4,
    name: '工程2'
  },
])



const treeList2 = ref([
  {
    id: 1,
    name: '工程1111111111111111111111',
    desc: '环境保护：市政规划市政规划市政规划市政规划廊道政规划廊道划廊道政规划廊道划廊道政规划廊道划廊道'
  },
  {
    id: 2,
    name: '工程2',
    desc: '环境保护：110m市政规划廊道................'
  },
  {
    id: 3,
    name: '工程2',
    desc: '环境保护：市政规划市政规划市政规划市政规划廊道政规划廊道划廊道政规划廊道划廊道政规划廊道划廊道'
  },
  {
    id: 4,
    name: '工程2',
    desc: '环境保护：市政规划市政规划市政规划市政规划廊道政规划廊道划廊道政规划廊道划廊道政规划廊道划廊道'
  },
])

const treeList3 = ref([
  {
    id: 1,
    name: '工程1111111111111111111111',
    desc: '环境保护：市政规划市政规划市政规划市政规划廊道政规划廊道划廊道政规划廊道划廊道政规划廊道划廊道'
  },
  {
    id: 2,
    name: '工程2',
    desc: '环境保护：110m市政规划廊道................'
  },
  {
    id: 3,
    name: '工程2',
    desc: '环境保护：市政规划市政规划市政规划市政规划廊道政规划廊道划廊道政规划廊道划廊道政规划廊道划廊道'
  },
  {
    id: 4,
    name: '工程2',
    desc: '环境保护：市政规划市政规划市政规划市政规划廊道政规划廊道划廊道政规划廊道划廊道政规划廊道划廊道'
  },
])

const isExpand1 = ref(false)
const treeH1 = computed(() => {
  return isExpand1.value ? (treeList1.value.length * 50 + 62) : 50
})
const isExpand2 = ref(false)
const treeH2 = computed(() => {
  return isExpand2.value ? (treeList2.value.length * 86 + 62) : 50
})

const isExpand3 = ref(false)
const treeH3 = computed(() => {
  return isExpand3.value ? (treeList3.value.length * 86 + 62) : 50
})



/* 拖拽完成 */
function handleDrop(item,typeNum) {

  // 保存至数据仓库
  setFlowNodeData(item)



  // 添加节点
  props.lf.dnd.startDrag({
    type: `demo-node${typeNum}`,
    text: item.name,
    properties: {
      height: 94,
      width: 260,
      textStyle: {
        display: 'none',
      },
      nodeData: item
    }

  });
}

onMounted(() => {
  let lf = props.lf;

  lf &&
    lf.on("selection:selected", () => {
      lf.updateEditConfig({
        stopMoveGraph: false,
      });
    });
})

</script>
    
<style lang="scss" scoped>
.bpmn-node-panel {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  background-color: #f5f6f7;
  overflow: auto;

  .tree {
    height: 52px;
    border-bottom: 1px solid #d2d5d9;
    overflow-y: hidden;
    transition: all .3s;

    .tree-title {
      height: 40px;
      margin-top: 6px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-500;
      font-weight: 500;
      color: #000000;
      cursor: pointer;

      .tree-title-icon {
        width: 10px;
        height: 6px;
        margin-right: 5px;
        transition: all 0.3s;
      }
    }

    .tree-list {
      padding: 0 10px 16px 23px;
    }

    .tree-item {
      position: relative;
      padding-left: 20px;
      margin-top: 6px;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        left: 2px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background: url('~@/assets/flowChart/tree-item-icon.png') no-repeat center/ 100% 100%;
      }
    }

  }

  // .tree-ac {
  //   height: auto;
  // }

  .tree-1 {
    .tree-title {
      .tree-title-icon-ac {
        transform: rotate(-90deg);
      }
    }
    .tree-item {
      height: 44px;
      display: flex;
      align-items: center;
      border: 1.2px solid #758396;
      border-radius: 4px;
      font-size: 16px;
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-400;
      color: #000000;


    }
  }

  .tree-2 {
    .tree-title {
      .tree-title-icon-ac {
        transform: rotate(-90deg);
      }
    }
    .tree-item {
      padding-bottom: 14px;
      background: #ffeee9;
      border: 1.2px solid #f07676;
      border-radius: 4px;

      .tree-item-name {
        display: flex;
        align-items: center;
        margin-top: 12px;
        font-size: 16px;
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-400;
        color: #000000;
        line-height: 20px;

        .tree-item-name-txt {
          width: calc(100% - 32px);
        }

        .tree-item-name-img {
          width: 24px;
          margin-left: 4px;
          margin-right: 8px;
        }
      }

      .tree-item-desc {
        margin-top: 8px;
        font-size: 16px;
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-400;
        color: #666666;
        line-height: 20px;
      }
    }
  }

  .tree-3 {
    .tree-title {
      .tree-title-icon-ac {
        transform: rotate(-90deg);
      }
    }
    .tree-item {
      padding-bottom: 14px;
      background: #e9f2ff;
      border: 1.5px solid #2f85ff;
      border-radius: 4px;

      .tree-item-name {
        display: flex;
        align-items: center;
        margin-top: 12px;
        font-size: 16px;
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-400;
        color: #000000;
        line-height: 20px;




      }

      .tree-item-desc {
        margin-top: 8px;
        font-size: 16px;
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-400;
        color: #666666;
        line-height: 20px;
      }
    }
  }
}
</style>