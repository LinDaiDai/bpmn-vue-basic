import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [{
        path: '/basic',
        component: () =>
            import ('./../components/basic')
    },
    {
        path: '/provider',
        component: () =>
            import ('./../components/provider')
    },
    {
        path: '/panel',
        component: () =>
            import ('./../components/panel')
    }
]

export default new Router({
    mode: 'history',
    routes
})