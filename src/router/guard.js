import router from './index'

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token')) {
        if (to.path === '/app') {
            next({
                path: '/dashboard'
            })
        } else {
            next()
        }
    } else {
        if (to.path === '/dashboard') {
            next({
                path: '/app'
            })
        } else if (to.path === '/dashboard/users') {
            next({
                path: '/app'
            })
        } else if ((to.path).indexOf('/dashboard/profile') != -1) {
            next({
                path: '/app'
            })
        } else {
            next()
        }
    }
})