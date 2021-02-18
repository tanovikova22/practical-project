<template>
  <div>
    <v-app-bar color="deep-blue accent-4" dense dark>
      <v-toolbar-title>Practical project</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link :to="'/registration'" tag="button">Registrate</router-link>

      <router-link :to="'/login'" tag="button" class="ml-5">Log in</router-link>
    </v-app-bar>
  </div>
</template>