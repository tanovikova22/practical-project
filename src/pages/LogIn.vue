<template>
  <v-app id="inspire">
    <navbar></navbar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="deep-blue accent-4" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-form @submit.prevent="onSubmit">
                <v-card-text>
                  <v-text-field
                    type="email"
                    v-model="email"
                    label="E-mail"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <div
                    class="error-message"
                    v-if="$v.email.$invalid && $v.email.$dirty"
                  >Please input correct email</div>
                  <v-text-field
                    type="password"
                    v-model="password"
                    label="Password"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                  <div
                    class="error-message"
                    v-if="$v.password.$invalid && $v.password.$dirty"
                  >Please enter valid password</div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    type="submit"
                    depressed
                    class="primary"
                    @submit="onSubmit"
                    :loading="getLoading"
                    :disabled="$v.password.$invalid || $v.email.$invalid"
                  >Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";
import Navbar from "../components/Navbar.vue";

export default {
  data: () => ({
    email: "",
    password: ""
  }),
  validations: {
    password: {
      required,
      minLength: minLength(5)
    },
    email: {
      required,
      email
    }
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit() {
      this.login({ email: this.email, password: this.password });
    }
  },

  computed: {
    ...mapGetters(["getLoading"])
  },

  components: {
    Navbar
  }
};
</script>
<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 10px;
}
</style>
