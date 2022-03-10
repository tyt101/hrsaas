import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
    token: getToken()
}
const mutations = {
    setToken(state, token) {
        state.token = token
        setToken(token)
    },
    removeToken(state) {
        state.token = null
        removeToken()
    }
}
const actions = {
    async login(context, data) {
        const result = await login(data);
        if (result.data.success) {
            context.commit('setToken', result.data.data)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
a