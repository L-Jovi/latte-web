import axios from 'axios'

const instance = axios.create({
  timeout: 12000,
})

instance.all = axios.all
instance.spread = axios.spread
instance.Cancel = axios.Cancel
instance.CancelToken = axios.CancelToken
instance.isCancel = axios.isCancel

instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  error.message = undefined
  if (error.response) {
    const { data, status, statusText, } = error.response
    const message = data && data.msg ? data.msg : status + ' ' + statusText
    error = new Error(message)
  }
  return Promise.reject(error)
})

export default instance
