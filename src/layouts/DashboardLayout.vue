<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
            url: `/dashboard/users`
          },
          {
            title: "Profile",
            icon: "mdi-account-lock-outline",
            url: "/dashboard/myProfile"
          }
        ];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

