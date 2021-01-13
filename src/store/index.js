import Vue from 'vue';
import Vuex from 'vuex'
import firebase from "firebase";
import router from '../router'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },

    actions: {
        registrate({ commit }, payload) {

            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    let id = user.uid;
                    commit('setUser', { ...payload, id })
                    router.push("/dashboard")
                }).catch(error => console.log(error.message))
        },

        login({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    let id = user.uid;
                    commit('setUser', { ...payload, id })
                    router.push("/dashboard")
                }).catch(error => console.log(error.message))
        }
    },

    getters: {
        getUser(state) {
            return state.user
        }
    }
})