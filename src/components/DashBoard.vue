<template>
  <v-container>
    <v-flex d-flex flex-row>
      <h2 class="ma-2 mr-5">Hi, {{getUser.name}}</h2>
      <v-btn class="ma-2" plain @click="logout()">Log Out</v-btn>
    </v-flex>
    <hr>

    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>
