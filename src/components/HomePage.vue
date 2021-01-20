<template>
  <v-container class="d-flex flex-row">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">LOG IN</div>
          <v-list-item-subtitle>If you have a profile log-in please</v-list-item-subtitle>
        </v-list-item-content>

        <v-icon>{{"mdi-lock-open-check-outline"}}</v-icon>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text>LOG IN</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">REGISTRATE</div>
          <v-list-item-subtitle>In case you dont have a profile registrate</v-list-item-subtitle>
        </v-list-item-content>

        <v-icon>{{ "mdi-account-lock-outline" }}</v-icon>
      </v-list-item>

      <v-card-actions>
        <router-link :to="'/registration'">
          <v-btn outlined rounded text>REGISTRATE</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {};
</script>

