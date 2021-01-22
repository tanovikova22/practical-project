<template>
  <v-container>
    <div class="text-center">
      <v-progress-circular v-if="!getAll" :size="50" color="primary" indeterminate></v-progress-circular>
    </div>

    <v-container v-if="getAll !== null">
      <v-list-item v-for="(item, idx) in getAll" :key="idx">
        <v-list-item-content>
          <v-list-item-title v-html="item.name"></v-list-item-title>
          <v-list-item-subtitle v-html="item.phone"></v-list-item-subtitle>
          <v-list-item-subtitle v-html="item.email"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAll", "getLoading"])
  },
  methods: {
    ...mapActions(["getAllUsers"])
  },
  mounted() {
    this.getAllUsers();
  }
};
</script>

