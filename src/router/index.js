import Vue from 'vue';
import Router from 'vue-router'

import Registration from '../components/Auth/Registration.vue'
import LogIn from '../components/Auth/LogIn.vue'
import DashBoard from '../layouts/DashboardLayout.vue'
import Users from '../components/Dashboard/Users.vue'
import Profile from '../components/Dashboard/Profile.vue'

Vue.use(Router);


export default new Router(

    {
        mode: 'history',
        routes: [{
            path: '/dashboard',
            component: DashBoard,
            redirect: '/dahboard/users',
            children: [{
                    path: 'users',
                    name: 'Users',
                    component: Users,
                    },
                    {
                    path: 'profile/:id',
                    name: 'Profile',
                    component: Profile,
                    },
                ]
            },
            {
            path: '/login',
            component: LogIn
            },
            {
            path: '/registration',
            component: Registration
            },
            {
            path: '*',
            redirect: '/login'
            }
        ],
    }
)