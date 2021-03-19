import Vue from "vue";
import Router from "vue-router";

import Registration from "../pages/Registration.vue";
import LogIn from "../pages/LogIn.vue";
import DashBoard from "../layouts/DashboardLayout.vue";
import Users from "../pages/Users.vue";
import Profile from "../pages/Profile.vue";
import UserProfile from '../pages/UserProfile.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/dashboard",
      component: DashBoard,
      redirect: "/dashboard/users",
      children: [{
          path: "users",
          name: "Users",
          component: Users,
        },
        {
          path: "myProfile/:id",
          name: "Profile",
          component: Profile
        },
        {
          path: "profile/:id",
          component: UserProfile
        }
      ]
    },
    {
      path: "/login",
      component: LogIn
    },
    {
      path: "/registration",
      component: Registration
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});