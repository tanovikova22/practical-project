<template>
  <v-container>{{showUser}}</v-container>
</template>

<script>
export default {
  computed: {
    showUser() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
