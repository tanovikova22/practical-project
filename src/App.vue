<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <error></error>
    </v-main>
  </v-app>
</template>

<script>
import Error from "./components/ErrorWindow.vue";
export default {
  name: "App",
  components: {
    Error
  }
};
</script>
