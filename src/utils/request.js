import axios from 'axios'

const service = axios.create({})
service.interceptors.request({})
service.interceptors.response({})
export default service