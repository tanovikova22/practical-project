<template>
  <div>
    <sidebar :menuItems="setMenu"></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Sidebar from "../components/Sidebar.vue";

export default {
  name: "DashboardLayout",

  computed: {
    ...mapGetters(["getUser"]),
    setMenu() {
      {
        return [
          {
            title: "Dashboard",
            icon: "mdi-monitor-dashboard",
            url: "/dashboard"
          },
          {
            title: "Users",
            icon: "mdi-lock-open-check-outline",
            url: "/dashboard/users"
          },
          {
            title: "Profile",
            icon: "mdi-account-lock-outline",
            url: "/dashboard/profile"
          }
        ];
      }
    }
  },

  components: {
    Sidebar
  }
};
</script>

<style lang="scss" scoped>
</style>

