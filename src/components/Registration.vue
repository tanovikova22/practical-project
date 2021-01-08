<template>
  <v-flex xs18 sm12 md6>
    <v-container>
      <h1>Registration page</h1>
      <v-card class="d-flex justify-center ma-10">
        <v-tabs vertical>
          <v-tab>
            <v-icon left>mdi-account</v-icon>First steps
          </v-tab>
          <v-tab>
            <v-icon left>mdi-lock</v-icon>Finishing
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-form @submit.prevent="onSubmit">
                <v-container>
                  <v-col>
                    <v-col cols="12">
                      <v-text-field v-model="name" label="Name" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="email" label="E-mail" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="phone" label="Phone number" required></v-text-field>
                    </v-col>
                  </v-col>
                </v-container>
              </v-form>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-form @submit.prevent="onSubmit">
                <v-container>
                  <v-col cols="12">
                    <v-text-field v-model="password" label="Password" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="passwordConfirm" label="Confirm password" required></v-text-field>
                  </v-col>
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" depressed class="primary" @submit="onSubmit">Register</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: ""
  }),
  methods: {
    onSubmit() {
      console.log(
        this.name +
          ";" +
          this.email +
          ";" +
          this.phone +
          ";" +
          this.password +
          ";" +
          this.passwordConfirm
      );
    }
  }
};
</script>
