import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
service.interceptors.request.use()
service.interceptors.response.use(response => {
    const { succuss, message, data } = response.data
    if (succuss) {
        return data
    } else {
        Message.error(message)
        return Promise.reject(new Error(message))
    }
}, error => {
    Message.error(error.Message)
    return Promise.reject(error)
})
export default service