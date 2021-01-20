<template>
  <v-app>
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
    <v-main>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
      <v-snackbar :value="showWindow" @input="setError('')">
        {{ getError }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" depressed v-bind="attrs" @click="setError('')">Close</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "App",

  data() {
    return {
      right: null
    };
  },

  methods: {
    ...mapMutations(["setError"])
  },

  computed: {
    ...mapGetters(["getError"]),

    showWindow() {
      if (this.getError) {
        return true;
      }
      return false;
    },

    setMenu() {
      if (this.isLogged) {
        return [
          {
            title: "Dashboard",
            icon: "mdi-monitor-dashboard",
            url: "/dashboard"
          }
        ];
      } else {
        return [
          {
            title: "Login",
            icon: "mdi-lock-open-check-outline",
            url: "/login"
          },
          {
            title: "Registration",
            icon: "mdi-account-lock-outline",
            url: "/registration"
          }
        ];
      }
    }
  },
  mounted() {
    if (localStorage.getItem("user")) {
      try {
        this.$store.commit("setUser", JSON.parse(localStorage.getItem("user")));
        this.$router.push("/dashboard");
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
button:focus {
  outline: 0;
}
</style>

