<!--
 * 核心关系
 * @author: ZJianJi
 * @since: 2024-11-21
 * index.vue
 -->
 <template>
  <div class="relationship-container">
    <div class="container" :class="{ 'container-ed': isEdit }" ref="containerRef"></div>
    <!-- 节点面板 -->
    <BpmnNodePanel :lf="lf" v-if="isEdit"></BpmnNodePanel>

    <div class="btn-box" :class="{ 'btn-box-ed': isEdit }">
      <el-button type="primary" @click="onSave" v-if="isEdit">保存</el-button>
      <el-button type="primary" @click="onEdit" v-if="!isEdit">编辑</el-button>
      <el-button type="primary" @click="onExport">导出图片</el-button>
      <el-button @click="onClear" v-if="isEdit">清空</el-button>
    </div>
    <div class="tool">
      <div class="tool-item" @click="onShrink">
        <img src="@/assets/flowChart/tool-1.png" alt="">
      </div>
      <div class="tool-item" @click="onMagnify">
        <img src="@/assets/flowChart/tool-2.png" alt="">
      </div>
      <div class="tool-item" @click="onResetZoom">
        <img src="@/assets/flowChart/tool-3.png" alt="">
      </div>
      <div class="tool-item" @click="onPre" v-if="isEdit">
        <img src="@/assets/flowChart/tool-4.png" alt="">
      </div>
      <div class="tool-item" @click="onNext" v-if="isEdit">
        <img src="@/assets/flowChart/tool-5.png" alt="">
      </div>
    </div>
  </div>
</template>
    
<script setup>
import LogicFlow from "@logicflow/core";
import { register, getTeleport } from '@logicflow/vue-node-registry'

import "@logicflow/core/dist/index.css";
import "@logicflow/core/lib/index.css";

import {
  BpmnElement,
  BpmnXmlAdapter,
  Snapshot,
  Control,
  Menu,
  SelectionSelect,
} from "@logicflow/extension";

import BpmnNodePanel from './components/bpmnNodePanel.vue'

import DemoNode1 from './components/demoNode1.vue'
import DemoNode2 from './components/demoNode2.vue'
import DemoNode3 from './components/demoNode3.vue'
import { useFlowStore } from '@/stores/flow'

const { flowData, setFlowNodeData, setFlowData } = useFlowStore()

const isEdit = ref(false)

const lf = ref(null)
const containerRef = ref(null)

const newFlowData = ref(flowData)



/* 初始化 */
function initLogicFlow() {
  // 右键菜单
  LogicFlow.use(Menu);
  // 导出图片
  LogicFlow.use(Snapshot);
  //初始化
  lf.value = new LogicFlow({
    container: containerRef.value,
    grid: {
      size: 10,
      visible: true,
      type: "mesh",
      config: {
        color: "#EAEAEA",
        thickness: 1,
      },
    },
    keyboard: {
      enabled: true,
    },

  });

  // 折线样式设置
  lf.value.setTheme({
    polyline: {
      stroke: '#7f7f7f',  // 线条颜色
      strokeWidth: 1.5, // 线条宽度
      strokeDashArray: '1,0',
      hoverStroke: '#000000', // 鼠标悬停在折线上时颜色
      selectedStroke: '#000000', // 折线被选中时颜色
      selectedShadow: true, // 折线被选中时是否显示阴影效果
      offset: 30, // 偏移
      outlineColor: '#000000', // 折线的轮廓颜色
      outlineStrokeDashArray: '3,3', // 针对轮廓线来创建虚线效果
    },
  })


  // 注册组件
  register({
    type: 'demo-node1',
    component: DemoNode1,
  }, lf.value)

  register({
    type: 'demo-node2',
    component: DemoNode2,
  }, lf.value)

  register({
    type: 'demo-node3',
    component: DemoNode3,
  }, lf.value)


  /* 设置事件 */
  const { eventCenter } = lf.value.graphModel;
  bindEvent(eventCenter);

  /* 配置操作 */
  lf.value.updateEditConfig({ 
    adjustNodePosition: false, // 是否允许拖动节点
    adjustEdge: false, // 是否允许调整连线
    hideAnchors: true, // 是否隐藏节点所有锚点
    nodeTextEdit: false, // 是否允许节点文本可以编辑
    hoverOutline: true
  })

  /* 渲染画布 */
  lf.value.render()

  /* 设置数据 */
  setData()

}

/* 绑定事件 */
function bindEvent(eventCenter) {
  eventCenter.on("node:dbclick", (args) => {
    if( isEdit.value ) return
    console.log("节点双击", args);
  });
}
/* 设置数据 */
function setData() {
  if (newFlowData.value && newFlowData.value?.nodes) {

    nextTick(() => {
      // 添加节点和连线

      for (let i = 0; i < newFlowData.value.nodes.length; i++) {
        if (i == 0) {
          setFlowNodeData(newFlowData.value.nodes[i].properties.nodeData)
          lf.value.addNode(newFlowData.value.nodes[i]);
        } else {
          setTimeout(() => {
            setFlowNodeData(newFlowData.value.nodes[i].properties.nodeData)
            lf.value.addNode(newFlowData.value.nodes[i]);
          }, 0);
        }
      }
      newFlowData.value.edges.forEach(edge => {
        lf.value.addEdge(edge);
      });
    })
  }
}

/* 编辑 */
function onEdit() {
  lf.value.updateEditConfig({ 
    adjustNodePosition: true, // 是否允许拖动节点
    adjustEdge: true, // 是否允许调整连线
    hideAnchors: false, // 是否隐藏节点所有锚点
  })
  isEdit.value = true
}

/* 保存数据 */
function onSave() {
  lf.value.updateEditConfig({ 
    adjustNodePosition: false, // 是否允许拖动节点
    adjustEdge: false, // 是否允许调整连线
    hideAnchors: true, // 是否隐藏节点所有锚点
  })
  isEdit.value = false
  setFlowData(lf.value.getGraphRawData())
  ElMessage.success('保存成功')
}

/* 导出图片 */
function onExport() {
  lf.value.getSnapshot()
}

/* 清空数据 */
function onClear() {
  if (!lf.value) return
  ElMessageBox.confirm(
    '是否清空所有数据?',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      setFlowData(null)
      lf.value.clearData();
      ElMessage({
        type: 'success',
        message: '已清空',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })

}

/* 上一步 */
function onPre() {
  lf.value.undo()
}
/* 下一步 */
function onNext() {
  lf.value.redo()
}

/* 重置 */
function onResetZoom() {
  lf.value.resetZoom()
}

/* 缩小 */
function onShrink() {
  lf.value.zoom(false);
}

/* 放大 */
function onMagnify() {
  lf.value.zoom(true);
}


onMounted(() => {
  initLogicFlow()
})
</script>
    
<style lang="scss" scoped>
.relationship-container {
  position: relative;
  height: 800px;

  .btn-box {
    position: absolute;
    top: 35px;
    right: 170px;
    display: flex;

    .el-button {
      height: 36px;
    }
  }

  .btn-box-ed {
    right: 260px;
  }

  .tool {
    position: absolute;
    top: 35px;
    right: 36px;
    display: flex;
    align-items: center;

    .tool-item {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
      cursor: pointer;

      img {
        width: 24px;
      }
    }

    .tool-item+.tool-item {
      margin-left: 8px;
    }
  }

  .container {
    width: 100%;
    height: 100%;
    border: 1px solid #cbcbcb;

    :deep(.lf-menu) {
      width: 0;
      overflow: hidden;
      border: 0;
    }

    :deep(.lf-text-input) {
      display: none;
    }
  }

  .container-ed {
    :deep(.lf-menu) {
      width: 120px;
      overflow: auto;
      border: 1px solid #efefee;
      .lf-menu-item:nth-child(2) {
        display: none;
      }
      .lf-menu-item:nth-child(3) {
        display: none;
      }
    }
    :deep(.lf-text-input) {
      display: block;
    }
  }

  .container-ed {
    width: calc(100% - 300px);
    margin-left: 300px;
  }

  :deep(.lf-element-text) {
    font-size: 14px;
  }


}
</style>