import axios from 'axios'
import {Message} from 'element-ui'

// 创建axios实例

const service = axios.create({
  timeout: 60000, // 请求超时时间
  baseURL: process.env.VUE_APP_API_BASE   // 反向代理
})

service.interceptors.response.use(config=> {
  if (config.data.code === 'S401') {
    window.location.href = config.data.data;
    return;
  }
  if (config.data.respCode !== "000000") {
    Message.error(config.data.msg)
  }

  return config
})

export default service
