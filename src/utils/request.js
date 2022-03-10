import axios from 'axios'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
service.interceptors.request({})
service.interceptors.response({})
export default service