import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/sys/login',
        method: 'post',
        data: data
    })
}

export function getUserInfo() {
    return request({
        url: '/sys/profile',
        method: 'post',
    })
}

export function logout() {}