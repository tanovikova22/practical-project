import Vue from 'vue';
import Router from 'vue-router'

import Registration from '../components/Registration'
import LogIn from '../components/LogIn'
import DashBoard from '../components/DashBoard'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: LogIn
        },
        {
            path: '/registration',
            component: Registration
        },
        {
            path: '/dashboard',
            component: DashBoard
        }
    ]
})