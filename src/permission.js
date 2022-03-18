import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
    // console.log(to.path)
    // console.log(from.path)
    nprogress.start()
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (!store.getters.userId) {
                const { roles } = await store.dispatch('user/getUserInfo')
                const routes = await store.dispatch('permission/filterRoutes', roles.menus)
                router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
                next(to.path)
            } else { next() }
        }
    } else {
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next('/login')
        }
    }
    nprogress.done()
})
router.afterEach(() => {
    nprogress.done()
})