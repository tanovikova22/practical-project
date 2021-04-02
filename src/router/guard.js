import router from './index'
import store from '../store'
// import firebase from 'firebase'

router.beforeEach((to, from, next) => {
    let token = store.state.auth.token
    let whitelist = ['/login', '/registration']
    let userData = store.state.auth.userData

    if (token) {
        if (userData) {
            if (whitelist.includes(to.path)) {
                next('/dashboard/myProfile')
            } else {
                next()
            }

        } else {
            // try{

            // }
            next()
            console.log('response')
        }
    } else {
        if (whitelist.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})