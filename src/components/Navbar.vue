<template>
  <div>
    <v-app-bar color="deep-blue accent-4" dense dark>
      <v-toolbar-title>Practical project</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link
        class="button-menu"
        v-for="(listItem, idx) in setNavList"
        :key="idx"
        :to="listItem.url"
        tag="button"
      >{{listItem.title}}</router-link>

      <button v-if="isLogged" class="button-menu" @click="logout">Log out</button>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    unlogged: [
      {
        url: "/registration",
        title: "Registrate"
      },
      {
        url: "/login",
        title: "Log in"
      }
    ],

    logged: [
      {
        url: "/dashboard/users",
        title: "Users"
      },
      {
        url: "/dashboard/profile",
        title: "Profile"
      }
    ]
  }),
  computed: {
    ...mapGetters(["isLogged"]),

    setNavList() {
      return this.isLogged ? this.logged : this.unlogged;
    }
  },

  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style scoped>
.button-menu {
  padding: 0px 10px;
}
</style>

