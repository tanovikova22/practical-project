<template>
  <v-container>
    <v-card class="mx-auto" max-width="434" tile>
      <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-img :src="findUser.avatar || placeholder"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="title">{{findUser.name}}</v-list-item-title>
                <v-list-item-subtitle>{{findUser.email}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{findUser.phone}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
      <router-link to="/dashboard/users" tag="button" class="mt-5">
        <v-btn dark color="indigo darken-2">Return to the pevious page</v-btn>
      </router-link>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    placeholder:
      "https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_1005/master/969.jpg?width=700&quality=85&auto=format&fit=max&s=470657ebd2a0e704df88997d393aea15"
  }),

  computed: {
    ...mapGetters(["users"]),

    findUser() {
      console.log(this.users.find(user => user.id === this.$route.params.id));
      return this.users.find(user => user.id === this.$route.params.id);
    }
  }
};
</script>

