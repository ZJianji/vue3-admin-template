import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCache, setCache } from '../utils/cache'

const FLOW_DATA = 'FLOW_DATA'

export const useFlowStore = defineStore('flow', () => {
  const flowData = ref(getCache(FLOW_DATA) || null)
  const flowNodeData = ref({
    id: '',
    name: '',
    desc: '',
    department: '',
  })

  function setFlowNodeData (val) {
    flowNodeData.value = val
  }

  function setFlowData(val) {
    flowData.value = val
    setCache(FLOW_DATA,val)
  }

  return { flowNodeData, flowData, setFlowNodeData, setFlowData }
})