import axios from 'axios'

class Http {
  /* 构造器 */
  constructor() {
    this.timeout = 100000
    this.baseURL = import.meta.env.VITE_API_URL
  }

  /* 拦截器 */
  setInterceptor(instance) {
    /* 请求拦截 */
    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
    /* 响应拦截 */
    instance.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          if (response?.data.page) {
            return response?.data
          } else if (response?.data?.data) {
            return response?.data?.data
          } else if (response?.data?.dataInfo) {
            return response?.data.dataInfo
          } else {
            return response?.data
          }
        }
        if (response.status === 404) {
          return '404'
        }

        return response.data
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /* options配置 */
  mergeOptions(option = {}) {
    return {
      timeout: this.timeout,
      baseURL: this.baseURL,
      ...option,
      headers: {
        ...(option.headers || {}),
      },
    }
  }

  /* 请求 */
  require(options) {
    const config = this.mergeOptions(options)
    const instance = axios.create()
    this.setInterceptor(instance)
    return instance(config)
  }

  /* get请求 */
  get(url, params, config = {}) {
    return this.require({
      url,
      method: 'get',
      ...config,
      params,
    })
  }

  /* post请求 */
  post(url, data = {}, config = {}, isFormData = false) {
    const { cacheKey } = data
    const _key = `${url}${cacheKey}`
    if (cacheKey) {
      delete data.cacheKey
      const cacheData = this._caches.get(_key)
      if (cacheData) {
        return Promise.resolve(cacheData)
      }
    }
    if (isFormData) {
      config.headers = {
        ...(config.headers || {}),
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      data = new URLSearchParams(data)
    }

    return this.require({
      url,
      method: 'post',
      ...config,
      data,
    }).then((res) => {
      if (cacheKey) {
        this._caches.set(_key, res)
      }
      return res
    })
  }
}

export default new Http()
