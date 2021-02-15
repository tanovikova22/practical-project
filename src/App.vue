<template>
  <v-app>
    <v-main>
        <router-view></router-view>
      <v-snackbar :value="showWindow" @input="setError(null)" :color="setColor">
        {{ getError }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" depressed v-bind="attrs" @click="setError(null)">Close</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "App",

  computed: {

    ...mapGetters(["getError"]),

    showWindow() {
     return Boolean(this.getError)
    },

    setColor() {
      if (this.getError){
        switch(this.getError){
          case "auth/user-not-found" : 
            return 'red';
          case "auth/too-many-requests" :
            return 'yellow';
          default: 'black';
        }
      }
      return "black";
    }
  },
  methods: {
    ...mapMutations(["setError"]),
  },
};
</script>

<style lang="scss" scoped>
button:focus {
  outline: 0;
}
</style>

