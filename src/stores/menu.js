import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCache, setCache, setSessionCache, getSessionCache } from '../utils/cache'

const MENU_TAGS = 'MENU_TAGS'

const HIDE_MENU = 'HIDE_MENU'

export const useMenuStore = defineStore('menu', () => {
  const isHideMenu = ref(getCache(HIDE_MENU) || false)

  const leftMenu = computed(() => isHideMenu.value ? '60px' : '210px')

  function setOpenMenu(val) {
    isHideMenu.value = val
    setCache(HIDE_MENU, val)
  }

  const menuTags = ref(getSessionCache(MENU_TAGS) || [])

  function setMenuTags(val) {
    menuTags.value = val
    setSessionCache(MENU_TAGS, val)
  }



  return { isHideMenu, leftMenu, setOpenMenu, menuTags, setMenuTags }
})
