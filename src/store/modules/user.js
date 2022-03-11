import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById, logout } from '@/api/user'
const state = {
    token: getToken(),
    userInfo: {}
}
const mutations = {
    setToken(state, token) {
        state.token = token
        setToken(token)
    },
    removeToken(state) {
        state.token = null
        removeToken()
    },
    setUserInfo(state, userInfo) {
        state.userInfo = {...userInfo }
    },
    reomveUserInfo(state) {
        state.userInfo = {}
    }
}
const actions = {
    async login(context, data) {
        const result = await login(data)
        context.commit('setToken', result)
        setTimeStamp();
    },
    async getUserInfo(context) {
        const result = await getUserInfo()
        const baseInfo = await getUserDetailById(result.userId)
        const resultInfo = {...result, ...baseInfo }
        context.commit('setUserInfo', resultInfo)
        return result
    },
    logout(context) {
        context.commit('removeToken')
        context.commit('reomveUserInfo')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}