<template>
  <v-container>
    <v-flex v-if="currPath" class="d-flex justify-center mt-10">YOU ARE WELCOME ON THE MAIN PAGE</v-flex>
    <h3 class="ma-5">Please login if you have a profile and registrate if not</h3>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  computed: {
    currPath() {
      return this.$route.path === "/app";
    }
  }
};
</script>


