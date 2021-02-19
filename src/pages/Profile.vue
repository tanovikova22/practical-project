<template>
  <v-flex xs12 sm12 md6>
    <v-card elevation="1" class="ma-5">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Your profile card</div>
          <v-list-item-title class="headline mb-1">{{getUser.name}}</v-list-item-title>
          <v-list-item-subtitle class="mt-4">EMAIL: {{getUser.email}}</v-list-item-subtitle>
          <v-list-item-subtitle class="mt-4">PHONE: {{getUser.phone}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img :src="avatarUrl">
        </v-list-item-avatar>
      </v-list-item>
      <v-card-actions>
        <v-file-input label="File input" v-model="file" @change="fun" class="pr-10"></v-file-input>
        <v-btn @click="logout">Log out</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    file: {},
    placeholder:
      "https://images.squarespace-cdn.com/content/v1/5269a983e4b0183a695ff960/1426100386219-GB1QCP6QOQ2LY9VLP894/ke17ZwdGBToddI8pDm48kIyvoTDOqK6tuLbY8s33gHl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UTzjvHSAOXjnTxN2sJb-n4pP61BYfWtluh1bxbCEA7ounr1xKjsq_-rO8kOgOtwYvw/%40tunameltsmyheart-1.jpg?format=1000w"
  }),
  computed: {
    ...mapGetters(["getUser"]),
    avatarUrl() {
      return this.getUser.payload ? this.getUser.payload : this.placeholder;
    }
  },
  methods: {
    ...mapActions(["logout", "recordAvatar"]),
    fun() {
      if (this.file) {
        let fl = new FileReader();
        fl.readAsDataURL(this.file);
        fl.onload = () => {
          this.recordAvatar(fl.result, this.getUser.id);
        };
      }
    }
  }
};
</script>

