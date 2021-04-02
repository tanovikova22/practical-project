<template>
  <v-app>
    <nav-bar />

    <v-main>
      <router-view></router-view>
      <error></error>
    </v-main>
  </v-app>

</template>

<script>
import NavBar from "./components/Navbar.vue";

import Error from "./components/ErrorWindow.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Error
  }
};
</script>
