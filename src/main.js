import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import Vuelidate from 'vuelidate';
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false

Vue.use(Vuelidate);



new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyCeEYoFs-LvN_KTRZvW5lltLd8G-Bt_BRY",
      authDomain: "practical-project-e8b48.firebaseapp.com",
      projectId: "practical-project-e8b48",
      storageBucket: "practical-project-e8b48.appspot.com",
      messagingSenderId: "32560067647",
      appId: "1:32560067647:web:645f41c0da0e79c29af48a",
      measurementId: "G-7CFSC6BK5Z"
    };
    firebase.initializeApp(firebaseConfig);
  }
}).$mount('#app')
