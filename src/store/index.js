import Vue from 'vue';
import Vuex from 'vuex'
import firebase from "firebase";
import router from '../router'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        loading: false
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        }
    },

    actions: {
        async registrate({ commit }, payload) {

            commit('setLoading', true)

            await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    let id = user.user.uid;
                    commit('setUser', { ...payload, id })


                    firebase.database().ref('users/' + id).set({
                        ...payload,
                        id
                    })
                    router.push("/dashboard")
                    localStorage.setItem('user', JSON.stringify({ ...payload }))
                }).catch(error => console.log(error.message))

            commit('setLoading', false)
        },

        async login({ commit }, payload) {

            commit('setLoading', true)

            await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    let id = user.user.uid;

                    let userData = firebase.database().ref('users/' + id)

                    userData.on('value', (snapshot) => {
                        const data = snapshot.val()
                        commit('setUser', { ...data })
                        localStorage.setItem('user', JSON.stringify({ ...data }))
                        router.push("/dashboard")
                    })

                }).catch(error => console.log(error.message))

            commit('setLoading', false)
        },
        logout({ commit }) {
            firebase.auth().signOut().then(() => {

                commit('setUser', null)
                localStorage.removeItem('user')
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
        },

        getLoading(state) {
            return state.loading
        }
    }
})