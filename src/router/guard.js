import router from './index'
import store from '../store'

router.beforeEach((to, from, next) => {
    if (store.getters.isLogged) {
        if (to.path === '/app') {
            next({
                path: '/dashboard'
            })
        }
        if (to.path === "/dashboard/profile/:id") {
            next({
                path: `/dashboard/profile/${store.getters.getUser.id}`
            })
        }
    }
})