import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
const TIMEOUT = 3600
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
service.interceptors.request.use(config => {
    if (store.getters.token) {
        if (isCheckTimeOut()) {
            store.dispatch('user/logout')
            router.push('/login')

            return Promise.reject(Message.error('token超时了'))
        }
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
        if (error && error.response && error.response.data.code === 10002) {
            store.dispatch('user/logout')
            router.push('/login')
        } else {
            Message.error(error.Message)
        }
        return Promise.reject(error)
    }
)

function isCheckTimeOut() {
    let currentTime = Date.now()
    return ((currentTime - getTimeStamp()) / 1000) > TIMEOUT;
}
export default service