<template>
  <v-navigation-drawer dark app permanent class="light-blue darken-4">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <!-- <router-link :to="'/dashboard'" tag="button">Menu</router-link> -->
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in menuItems" :key="item.title" :to="setUrl(item)">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    menuItems: {
      type: Array
    }
  },

  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    setUrl(item) {
      if (item.url === "/dashboard/profile" && this.getUser !== null) {
        return { name: "Profile", params: { id: this.getUser.id } };
      } else {
        return item.url;
      }
    }
  }
};
</script>

