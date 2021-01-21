import Vue from 'vue';
import Router from 'vue-router'

import Registration from '../components/Registration'
import LogIn from '../components/LogIn'
import DashBoard from '../components/DashBoard'
import HomePage from '../components/HomePage'
import store from '../store'
import Users from '../components/Users'
import Profile from '../components/Profile'

Vue.use(Router);


function guard(to, from, next) {
    if (store.getters.isLogged) {
        next()
    } else {
        next('/login?loginError=true')
    }
}

export default new Router(

    {
        mode: 'history',
        routes: [
            {
                path: '/dashboard',
                component: DashBoard,
                beforeEnter: guard,
                meta: {
                    layout: 'DashboardLayout'
                },
                children: [
                    {
                        path: 'users',
                        component: Users
                    },
                    {
                        path: 'profile',
                        component: Profile
                    }
                ]
            },
            {
                path: '/app',
                component: HomePage,
                meta: {
                    layout: 'AuthLayout'
                },
                children: [
                    {
                        path: 'login',
                        component: LogIn
                    },
                    {
                        path: 'registration',
                        component: Registration
                    },
                ]
            }
        ],
    })

