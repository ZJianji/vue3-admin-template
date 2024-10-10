import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCache, setCache, deleteCache } from '../utils/cache'

const USER_TOKEN = 'USER_TOKEN'

export const useUserStore = defineStore('user', () => {
  const token = ref(getCache(USER_TOKEN))
  function setToken(val) {
    token.value = val
    if (!val) return deleteCache(USER_TOKEN)
    setCache(USER_TOKEN, val)
  }
  return { token, setToken }
})
