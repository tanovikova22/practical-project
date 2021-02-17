<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Registration form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="onSubmit">
                  <v-container v-if="firstPage">
                    <v-text-field type="text" v-model="name" label="Name" @blur="$v.name.$touch()"></v-text-field>
                    <div
                      class="error-message"
                      v-if="$v.name.$invalid && $v.name.$dirty"
                    >Please input valid name</div>
                    <v-text-field
                      type="email"
                      v-model="email"
                      label="E-mail"
                      @blur="$v.email.$touch()"
                    ></v-text-field>
                    <div
                      class="error-message"
                      v-if="$v.email.$invalid && $v.email.$dirty"
                    >Please enter valid email</div>
                    <v-text-field
                      type="phone"
                      v-model="phone"
                      :counter="13"
                      label="Phone"
                      @blur="$v.phone.$touch()"
                    ></v-text-field>
                    <div
                      class="error-message"
                      v-if="$v.phone.$invalid && $v.phone.$dirty"
                    >Please enter valid phone</div>
                  </v-container>
                  <v-container v-else>
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
                    <v-text-field
                      type="password"
                      v-model="passwordConfirm"
                      label="Confirm password"
                      @blur="$v.passwordConfirm.$touch()"
                    ></v-text-field>
                    <div
                      class="error-message"
                      v-if="$v.passwordConfirm.$invalid && $v.passwordConfirm.$dirty"
                    >Please enter same password</div>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-if="getError"
                      @click="firstPage = true"
                      depressed
                    >Return to the previous page</v-btn>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="primary"
                  :disabled="isDisabled"
                  :loading="getLoading"
                  @click="next"
                >{{nameButton}}</v-btn>
              </v-card-actions>
            </v-card>
            <div class="mt-10">
              If you have an account, please
              <router-link :to="'/login'">log in</router-link>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  numeric,
  helpers
} from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

const alpha = helpers.regex("alpha", /[A-Z][a-z]{2,}/g);

export default {
  data: () => ({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    firstPage: true
  }),

  validations: {
    name: {
      required,
      minLength: minLength(2),
      alpha
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      maxLength: maxLength(13),
      minLength: minLength(10),
      numeric
    },
    password: {
      required,
      minLength: minLength(6)
    },
    passwordConfirm: {
      required,
      minLength: minLength(6),
      sameAs: sameAs("password")
    }
  },
  methods: {
    ...mapActions(["registrate"]),

    onSubmit() {
      let user = {
        email: this.email,
        name: this.name,
        phone: this.phone,
        password: this.password
      };
      this.registrate(user);
    },
    next() {
      if (this.firstPage) {
        this.firstPage = false;
      } else {
        this.onSubmit();
      }
    }
  },
  computed: {
    ...mapGetters(["getLoading", "getError"]),
    isDisabled() {
      return this.firstPage
        ? this.$v.phone.$invalid ||
            this.$v.email.$invalid ||
            this.$v.name.$invalid
        : this.$v.password.$invalid || this.$v.passwordConfirm.$invalid;
    },
    nameButton() {
      return this.firstPage ? "Next step " : "Finish";
    }
  }
};
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 10px;
}
</style>