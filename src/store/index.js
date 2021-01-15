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
                    let id = user.user.uid;
                    commit('setUser', { ...payload, id })
                    router.push("/dashboard")
                    firebase.database().ref('users/' + id).set({
                        ...payload,
                        id
                    })
                }).catch(error => console.log(error.message))
        },

        login({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    let id = user.user.uid;

                    let userData = firebase.database().ref('users/' + id)

                    userData.on('value', (snapshot) => {
                        const data = snapshot.val()
                        commit('setUser', { ...data })
                    })
                    //router.push("/dashboard")


                }).catch(error => console.log(error.message))
        },
        logout({ commit }) {
            firebase.auth().signOut().then(() => {
                commit('setUser', null)
                router.push('/login')
            }
            ).catch(e => console.log(e))
        }
    },

    getters: {
        getUser(state) {
            return state.user
        },

        isLogged(state) {
            return state.user !== null
        }
    }
})