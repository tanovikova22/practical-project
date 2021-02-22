import firebase from "firebase";
import router from './../../router'

export default {
    state: {
        userData: null,
        token: localStorage.getItem("token")
    },

    mutations: {
        setUser(state, payload) {
            state.userData = payload
        },

        setToken(state, payload) {
            state.token = payload
        }
    },

    actions: {
        async registrate({
            commit
        }, payload) {

            commit('setLoading', true)

            await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    let id = user.user.uid;
                    commit('setUser', {
                        ...payload,
                        id
                    })


                    firebase.database().ref('users/' + id).set({
                        ...payload,
                        id
                    })
                    firebase.auth().currentUser.getIdToken().then(token => {
                        localStorage.setItem('token', (token))
                        commit('setToken', token)
                        router.push("/dashboard/users")
                    }).catch(e => console.log(e))
                }).catch(error => {
                    commit('setError', error)
                })

            commit('setLoading', false)
        },

        async login({
            commit
        }, payload) {
            commit('setLoading', true)

            try {
                let response = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                let id = response.user.uid;
                let userData = firebase.database().ref('users/' + id)
                userData.on('value', async (snapshot) => {
                    const data = snapshot.val()
                    commit('setUser', {
                        ...data
                    })
                    await firebase.auth().currentUser.getIdToken().then(token => {
                        localStorage.setItem('token', (token))
                        commit('setToken', token)
                        router.push("/dashboard/users")
                    }).catch(e => console.log(e))

                })
            } catch (error) {
                commit('setError', error)
                console.log(error)
            }

            commit('setLoading', false)
        },

        async logout({
            commit
        }) {
            localStorage.removeItem('token')
            commit('setToken', null)
            await firebase.auth().signOut().then(() => {
                commit('setUser', null)
                router.push('/login')
            }).catch(e => commit('setError', e))
        },

        async recordAvatar({
            commit,
            rootGetters
        }, avatar) {
            try {
                commit('setLoading', true)
                await firebase.database().ref(`users/${rootGetters.getUser.id}/`).update({
                    avatar
                })
                commit('setUser', {
                    ...rootGetters.getUser,
                })
                commit('setLoading', false)
            } catch (e) {
                commit('setError', e)
            }

        }

    },


}