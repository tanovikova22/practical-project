<template>
  <div>
    <v-navigation-drawer dark app permanent class="light-blue darken-4">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <router-link :to="'/'" tag="button">Menu</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in setMenu" :key="item.title" :to="item.url">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "DashboardLayout",

  computed: {
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
            url: "/users"
          },
          {
            title: "Profile",
            icon: "mdi-account-lock-outline",
            url: "/profile"
          }
        ];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  background-color: yellow;
}
</style>

