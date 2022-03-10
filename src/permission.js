import router from "@/router";
import store from '@/store'
import nprogress from "nprogress";
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
                await store.dispatch('user/getUserInfo')
            }
            next()
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