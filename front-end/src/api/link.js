import axios from 'axios'

// let baseURL = '/api'     // reverse proxy
const link = axios.create({
  timeout: 30000, // timeout
  baseURL: process.env.VUE_APP_API_BASE  // reverse proxy
})
// Request interface for jumping external links
export function getLinkConfig() {
  return link({
    url: '/redirectmap',
    method: 'post'
  })
}
