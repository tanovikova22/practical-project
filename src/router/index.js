import Vue from 'vue';
import Router from 'vue-router'

import Registration from '../components/Auth/Registration.vue'
import LogIn from '../components/Auth/LogIn.vue'
import DashBoard from '../components/Dashboard/DashBoard.vue'
import HomePage from '../components/Auth/HomePage.vue'
//import store from '../store'
import Users from '../components/Dashboard/Users.vue'
import Profile from '../components/Dashboard/Profile.vue'

Vue.use(Router);


// function guard(to, from, next) {
//     if (store.getters.isLogged) {
//         next()
//     } else {
//         next('/login?loginError=true')
//     }
// }




export default new Router(

    {
        mode: 'history',
        routes: [{
                path: '/dashboard',
                component: DashBoard,
                //beforeEnter: guard,
                meta: {
                    layout: 'DashboardLayout'
                },
                children: [{
                        path: 'users',
                        component: Users,
                        layout: 'DashboardLayout'
                    },
                    {
                        path: 'profile/:id',
                        name: 'Profile',
                        component: Profile,
                        layout: 'DashboardLayout'
                    },
                ]
            },
            {
                path: '/app',
                component: HomePage,
                meta: {
                    layout: 'AuthLayout'
                },
                children: [{
                        path: 'login',
                        component: LogIn
                    },
                    {
                        path: 'registration',
                        component: Registration
                    },
                ]
            },
            {
                path: '*',
                redirect: '/app'
            }
        ],
    })