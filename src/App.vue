<template>
  <v-app>
    <v-navigation-drawer dark app permanent class="light-blue darken-4">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.url">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      items: [
        { title: "Login", icon: "mdi-lock-open-check-outline", url: "/" },
        {
          title: "Registration",
          icon: "mdi-account-lock-outline",
          url: "/registration"
        },
        { title: "Dashboard", icon: "mdi-monitor-dashboard", url: "/dashboard" }
      ],
      right: null
    };
  }
};
</script>

<style lang="scss" scoped>
</style>

