/** axios封装 */
import axios , { AxiosResponse, AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios'
import { message } from 'antd'
axios.defaults.baseURL = ''
// 请求超时时间
axios.defaults.timeout = 10000
// post请求头
// 请求拦截器
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // 自定义拦截
  config.validateStatus = function (status) {
    return status >= 200 && status < 500 // default
  }
  return config
},                             (error:AxiosError) => {
  Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) {
      if (response.data.status === 1) {
        return Promise.resolve(response)
      }
      message.warning(response.data.msg)
      return Promise.reject(response)
    }
    return Promise.reject(response)
  },
   (error: AxiosError): Promise<AxiosError> => {
     return Promise.reject(error)
   })
export function get(url: string, params?: object) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
    })
      .then((res:AxiosResponse) => {
        resolve(res.data)
      })
      .catch((err:AxiosError) => {
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, data?: object) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
// tslint:disable-next-line: ter-arrow-parens
      .then((res:AxiosResponse) => {
        resolve(res.data)
      })
// tslint:disable-next-line: ter-arrow-parens
      .catch((err:AxiosError) => {
        reject(err)
      })
  })
}
