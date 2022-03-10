import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
service.interceptors.response.use(
    response => {
        const { success, message, data } = response.data
        if (success) {
            console.log('success')
            return data
        } else {
            console.log('default')
            Message.error(message)
            return Promise.reject(new Error(message))
        }
    }, error => {
        Message.error(error.Message)
        return Promise.reject(error)
    }
)
export default service