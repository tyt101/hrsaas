import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
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
        state.userInfo = userInfo
    },
    reomveUserInfo(state) {
        state.userInfo = {}
    }
}
const actions = {
    async login(context, data) {
        const result = await login(data);
        context.commit('setToken', result)
    },
    getUserInfo(context) {
        const result = getUserInfo()
        context.commit('setUserInfo', result)
        return result
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}