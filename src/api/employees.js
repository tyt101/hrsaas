import request from '@/utils/request'


export function getEmployeeSimple() {
    return request({
        url: '/sys/user/simple'
    })
}

export function getEmployeeList(params) {
    return request({
        url: '/sys/user',
        params
    })
}