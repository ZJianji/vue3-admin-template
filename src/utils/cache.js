/* ------------------------------------------ localStorage 本地存储封装  ------------------------------------------- */

/**
 * 存储数据
 */
export const setCache = (key, value) => {
  // 将数组、对象类型的数据转化为 JSON 字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/**
 * 获取数据
 */
export const getCache = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/**
 * 删除数据
 */
export const deleteCache = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const clearAllCache = () => {
  window.localStorage.clear()
}


/* ------------------------------------------ sessionStorage 本地存储封装  ------------------------------------------- */

/**
 * 存储数据
 */
export const setSessionCache = (key, value) => {
  // 将数组、对象类型的数据转化为 JSON 字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getSessionCache = (key) => {
  const data = window.sessionStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}