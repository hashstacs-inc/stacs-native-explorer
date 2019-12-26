import axios from 'axios'
import {Message} from 'element-ui'

const service = axios.create({
  timeout: 60000,
  baseURL: process.env.VUE_APP_API_BASE
})

service.interceptors.response.use(config=> {
  if (config.data.code !== "000000") {
    Message.error(config.data.msg)
  }
  return config
})

export default service
