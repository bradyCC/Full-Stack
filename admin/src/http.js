/**
 * Created by brady on 2019/6/15.
 */
import Vue from 'vue'
import axios from 'axios'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api/'
})

// axios 请求头
http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// axios 拦截器
http.interceptors.response.use(res => {
  return res
},err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if (err.response.status == 401) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

export default http
