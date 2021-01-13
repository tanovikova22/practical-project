import Vue from 'vue';
import Vuex from 'vuex'
import firebase from "firebase";

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
            console.log('ACTION')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
                let id = user.uid;
                commit('setUser', { ...payload, id })
            })
        }
    },

    getters: {
        getUser(state) {
            return state.user
        }
    }
})