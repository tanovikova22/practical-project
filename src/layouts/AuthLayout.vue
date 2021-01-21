<template>
  <div class="container">
    <v-flex>
      <v-container>
        <v-card>
          <v-toolbar color="blue" flat>
            <router-link :to="'/app'" tag="span" :style="{cursor: 'pointer'}">
              <v-toolbar-title>{{'Authorization'.toUpperCase()}}</v-toolbar-title>
            </router-link>

            <v-spacer></v-spacer>

            <router-link :to="'/app/registration'" tag="button">
              <v-btn depressed color="blue">REGISTRATION</v-btn>
            </router-link>
            <router-link :to="'/app/login'" tag="button">
              <v-btn depressed color="blue">LOG IN</v-btn>
            </router-link>
          </v-toolbar>
        </v-card>
        <slot></slot>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: "AuthLayout"
};
</script>

<style lang="scss" scoped>
.container {
  min-width: 100%;
  padding: 0;
}
slot {
  min-height: 100%;
}
</style>

