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

export function delEmployee(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'delete'
    })
}

export function addEmployee(data) {
    return request({
        url: '/sys/user',
        method: 'post',
        data
    })
}

export function importEmployee(data) {
    return request({
        url: '/sys/user/batch',
        method: 'post',
        data
    })
}

export function saveUserDetailById(data) {
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}

export function getPersonalDetail(id) {
    console.log('已进入')
    return request({
        url: `/employees/${id}/personalInfo`
    })
}
export function savePersonalDetail(data) {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}
export function getJobDetail(id) {
    return request({
        url: `/employees/${id}/jobs`
    })
}

export function saveJobDetail(data) {
    return request({
        url: `/employees/${data.userId}/jobs`,
        data,
        method: 'put'
    })
}