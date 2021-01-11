<template>
  <v-flex xs24 sm16 md8>
    <v-container>
      <h1>Registration page</h1>
      <v-card class="d-flex justify-center ma-10">
        <v-tabs vertical>
          <v-tab :disabled="invalidFirstPage">
            <v-icon left>mdi-account</v-icon>First steps
          </v-tab>
          <v-tab :disabled="invalidSecondPage">
            <v-icon left>mdi-lock</v-icon>Finishing
          </v-tab>

          <v-tab-item class="pa-10">
            <validation-observer ref="firstPage">
              <form @submit.prevent="onSubmit">
                <validation-provider
                  name="name"
                  :rules="{required:true,regex:'[A-Z][a-z]{2,}'}"
                  v-slot="{ errors }"
                >
                  <v-text-field v-model="name" label="Name" :error-messages="errors"></v-text-field>
                </validation-provider>

                <validation-provider
                  name="Email"
                  :rules="{required: true, email}"
                  v-slot="{ errors }"
                >
                  <v-text-field v-model="email" label="E-mail" :error-messages="errors"></v-text-field>
                </validation-provider>

                <validation-provider
                  name="phone"
                  :rules="{required: true, min: 10, max:13, regex: '[0-9]'}"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="phone"
                    :counter="13"
                    label="Phone"
                    :error-messages="errors"
                    @blur="onSubmit"
                  ></v-text-field>
                </validation-provider>
              </form>
            </validation-observer>
          </v-tab-item>
          <v-tab-item class="pa-10">
            <validation-observer ref="secondPage">
              <form>
                <validation-provider
                  name="password"
                  :rules="{required:true, min: 5}"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    type="password"
                    v-model="password"
                    label="Password"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  name="passwordConfirm"
                  :rules="{required:true, min: 5, is:password}"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    type="password"
                    v-model="passwordConfirm"
                    label="Confirm password"
                    :error-messages="errors"
                    @blur="onSubmitForm"
                  ></v-text-field>
                </validation-provider>
                <v-btn class="success" :disabled="disabledSend">Finish registration</v-btn>
              </form>
            </validation-observer>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import { required, max, min, email, regex, is } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "This field is required"
});
extend("min", {
  ...min,
  message: "Mast be at least 10 numbers"
});
extend("max", {
  ...max,
  message: "Must be less then 14"
});
extend("email", {
  ...email,
  message: "Check email"
});
extend("regex", {
  ...regex,
  message: "The fromat is {regex}"
});
extend("is", {
  ...is,
  message: "Check if passwords are similar"
});

export default {
  data: () => ({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    invalidSecondPage: true,
    invalidFirstPage: false,
    disabledSend: true
  }),

  methods: {
    onSubmit() {
      this.$refs.firstPage
        .validate()
        .then(
          success => (
            (this.invalidSecondPage = !success),
            (this.invalidFirstPage = success)
          )
        );
      console.log(1);
    },
    onSubmitForm() {
      this.$refs.secondPage
        .validate()
        .then(success => (this.disabledSend = !success));
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  }
};
</script>
