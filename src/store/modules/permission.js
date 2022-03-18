import { constantRoutes, asyncRoutes } from '@/router'
const state = {
    routes: constantRoutes
}
const mutations = {
    setRoutes(state, newRoute) {
        state.routes = [...constantRoutes, ...newRoute]
    }
}
const actions = {
    filterRoutes(context, menus) {
        const routes = []
        menus.forEach(key => {
            routes.push(...asyncRoutes.filter(item => {
                return item.name === key
            }))
        })
        context.commit('setRoutes', routes)
        return routes
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}