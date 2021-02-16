<template>
  <v-container>
    <div class="text-center">
      <v-progress-circular v-if="!getAll" :size="50" color="primary" indeterminate></v-progress-circular>
    </div>

    <v-form>
      <v-container>
        <v-text-field v-model="search" @input="filterItems">
          <template v-slot:label>
            Whom ure you looking for?
            <v-icon style="vertical-align: middle">{{"mdi-magnify"}}</v-icon>
          </template>
        </v-text-field>
      </v-container>
    </v-form>

    <v-flex xs12 sm8 md4 v-if="getAll !== null">
      <v-card class="d-flex justify-center mb-6" v-for="(item, idx) in getAll" :key="idx">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle v-html="item.phone"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="item.email"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    search: "",
  }),
  computed: {
    ...mapGetters(["getAll", "getLoading"])
  },
  methods: {
    ...mapActions(["getAllUsers"]),

    filterItems(e){
      console.log(e)
    }
  },
  created() {
    this.getAllUsers();
  }
};
</script>

