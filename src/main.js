import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import * as directives from '@/directives'
import * as filters from '@/filters'
import '@/styles/index.scss' // global css
import components from '@/components'
Vue.use(components)
import App from './App'
import store from './store'
import router from './router'
import checkPermission from './mixin/checkPermission'
import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
    // 如果想要中文版 element-ui，按如下方式声明
    // Vue.use(ElementUI)
Vue.mixin(checkPermission)
Vue.config.productionTip = false
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
})
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// console.log(Object.keys(directives))
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})