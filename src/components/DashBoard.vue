<template>
  <v-container>
    <h1>Hi, {{getUser.name}}</h1>
    <v-btn @click="logout()">Log Out</v-btn>
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
