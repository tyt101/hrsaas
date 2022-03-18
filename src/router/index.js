import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import userRputer from './modules/user'
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
/* Layout */
import Layout from '@/layout'
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },
    {
        path: '/import',
        component: Layout,
        hidden: true,
        children: [{
            path: '',
            name: 'Import',
            component: () =>
                import ('@/views/import')
        }]
    },
    userRputer
    // 404 page must be placed at the end !!!

]
export const asyncRoutes = [
    approvalsRouter,
    departmentsRouter,
    employeesRouter,
    permissionRouter,
    attendancesRouter,
    salarysRouter,
    settingRouter,
    socialRouter
]
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router