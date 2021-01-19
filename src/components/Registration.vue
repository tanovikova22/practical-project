<template>
  <v-flex xs12 sm8 md4>
    <v-container>
      <h1>Registration page</h1>
      <v-card class="justify-center pa-2">
        <v-form @submit.prevent="onSubmit">
          <v-container v-if="firstPage">
            <v-col>
              <v-col cols="12">
                <v-text-field type="text" v-model="name" label="Name" @blur="$v.name.$touch()"></v-text-field>
                <div
                  class="error-message"
                  v-if="$v.name.$invalid && $v.name.$dirty"
                >Please input valid name</div>
              </v-col>
              <v-col cols="12">
                <v-text-field type="email" v-model="email" label="E-mail" @blur="$v.email.$touch()"></v-text-field>
                <div
                  class="error-message"
                  v-if="$v.email.$invalid && $v.email.$dirty"
                >Please enter valid email</div>
              </v-col>
              <v-col cols="12">
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
              </v-col>
            </v-col>
          </v-container>
          <v-container v-else>
            <v-col cols="12">
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
            </v-col>
            <v-col cols="12">
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
            </v-col>
          </v-container>
        </v-form>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="primary"
          :disabled="isDisabled"
          :loading="getLoading"
          @click="next"
        >{{nameButton}}</v-btn>
      </v-card-actions>
    </v-container>
  </v-flex>
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
    isDisabled() {
      return this.firstPage
        ? this.$v.phone.$invalid ||
            this.$v.email.$invalid ||
            this.$v.name.$invalid
        : this.$v.password.$invalid || this.$v.passwordConfirm.$invalid;
    },
    nameButton() {
      return this.firstPage ? "Next step " : "Finish";
    },

    ...mapGetters(["getLoading"])
  }
};
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 10px;
}
</style>