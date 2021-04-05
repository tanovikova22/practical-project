<template>
  <v-snackbar timeout="-1" :value="showWindow" @input="setError(null)" :color="setColor">
    {{ error }}
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" depressed v-bind="attrs" @click="setError(null)">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["error"]),

    showWindow() {
      return Boolean(this.error);
    },

    setColor() {
      if (this.error) {
        switch (this.error) {
          case "auth/user-not-found":
            return "red";
          case "auth/too-many-requests":
            return "yellow";
          default:
            "black";
        }
      }
      return "black";
    }
  },
  methods: {
    ...mapMutations(["setError"])
  }
};
</script>


<style lang="scss" scoped>
button:focus {
  outline: 0;
}
</style>

