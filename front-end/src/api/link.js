import axios from 'axios'

// let baseURL = '/api'     // 反向代理
const link = axios.create({
  timeout: 30000, // 超时设置
  baseURL: process.env.VUE_APP_API_BASE  // 反向代理
})
// 跳转外部链接的请求接口
export function getLinkConfig() {
  return link({
    url: '/redirectmap',
    method: 'post'
  })
}
