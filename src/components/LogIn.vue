<template>
  <v-flex xs12 sm8 md4>
    <v-container>
      <h1>Log-in page</h1>
      <v-form @submit.prevent="onSubmit">
        <v-container>
          <v-col>
            <v-col cols="12">
              <v-text-field type="email" v-model="email" label="E-mail" @blur="$v.email.$touch()"></v-text-field>
              <div
                class="error-message"
                v-if="$v.email.$invalid && $v.email.$dirty"
              >Please input correct email</div>
            </v-col>
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
          </v-col>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            depressed
            class="primary"
            @submit="onSubmit"
            :disabled="$v.password.$invalid || $v.email.$invalid"
          >Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </v-flex>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
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
  }
};
</script>
<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 10px;
}
</style>
