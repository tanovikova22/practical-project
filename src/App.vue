<template>
  <v-app>
    <v-main>
      <component :is="layout">
        <router-view></router-view>
      </component>
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

  methods: {
    ...mapMutations(["setError"])
  },

  computed: {
    layout() {
      return (
        this.$route.meta.layout ||
        this.$route.matched[0].meta.layout ||
        "AuthLayout"
      );
    },

    ...mapGetters(["getError"]),

    showWindow() {
      if (this.getError) {
        return true;
      }
      return false;
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

