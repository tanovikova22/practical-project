<template>
  <v-container>
    <div class="text-center">
      <v-progress-circular v-if="!getAll" :size="50" color="primary" indeterminate></v-progress-circular>
    </div>

    <v-form v-if="getAll !== null">
      <v-container>
        <v-text-field v-model="search">
          <template v-slot:label>
            Whom ure you looking for?
            <v-icon style="vertical-align: middle">{{"mdi-magnify"}}</v-icon>
          </template>
        </v-text-field>
      </v-container>
    </v-form>
    <v-btn class="mb-5 mr-2"  v-if="getAll !== null"  @click="pageNumber=pageNumber-1" :disabled="pageNumber === 0">Previous</v-btn>
    <v-btn class="mb-5"  v-if="getAll !== null" @click="pageNumber=pageNumber+1" :disabled="isAnyPagAhead">Next</v-btn>
    <v-flex xs12 sm8 md4 v-if="getAll !== null">
      <v-card class="d-flex justify-center mb-6" v-for="(item, idx) in  showUsers" :key="idx">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle v-html="item.phone"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="item.email"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>
    <div>Page {{pageNumber+1}}/{{Math.ceil(filterItems.length/3)}}</div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: () => ({
    search: "",
    pageNumber: 0
  }),
  computed: {
    ...mapGetters(["getAll", "getLoading"]),
    filterItems() {
      return this.getAll.filter(element =>
        element.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    showUsers(){
     let start = this.pageNumber * 3
     let end = start + 3 
     return this.filterItems.slice(start, end)
    },
    isAnyPagAhead(){
      return (this.pageNumber < (this.filterItems.length / 3) - 1) ? false : true
    }
  },
  methods: {
    ...mapActions(["getAllUsers"]),
    ...mapMutations(["setAll"])
  },

  created() {
    this.getAllUsers();
  }
};
</script>

