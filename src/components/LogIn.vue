<template>
  <v-flex xs12 sm8 md4>
    <v-container>
      <h1>Log-in page</h1>
      <v-form @submit.prevent="onSubmit">
        <v-container>
          <v-col>
            <v-col cols="12">
              <v-text-field v-model="email" label="E-mail" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="password" label="Password" required></v-text-field>
            </v-col>
          </v-col>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" depressed class="primary" @submit="onSubmit">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    onSubmit() {
      console.log(this.email + ";" + this.password);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
