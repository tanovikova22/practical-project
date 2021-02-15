import firebase from "firebase";
import router from './../../router'

export default {
    state: {
        user: null,
        allUsers: null
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setAll(state, payload) {
            state.allUsers = payload
        }
    },

    actions: {
        async registrate({
            commit
        }, payload) {

            commit('setLoading', true)

            await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    console.log(user)
                    let id = user.user.uid;
                    commit('setUser', {
                        ...payload,
                        id
                    })


                    firebase.database().ref('users/' + id).set({
                        ...payload,
                        id
                    })
                    router.push("/dashboard")
                    firebase.auth().currentUser.getIdToken().then(token => {
                        localStorage.setItem('token', (token))
                    }).catch(e => console.log(e))
                    localStorage.setItem('user', JSON.stringify({
                        ...payload
                    }))
                }).catch(error => commit('setError', error))

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
                userData.on('value', (snapshot) => {
                    const data = snapshot.val()
                    commit('setUser', {
                        ...data
                    })
                    firebase.auth().currentUser.getIdToken().then(token => {
                        localStorage.setItem('token', (token))
                    }).catch(e => console.log(e))

                    localStorage.setItem('user', JSON.stringify({
                        ...data
                    }))
                    router.push("/dashboard")
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
            await firebase.auth().currentUser.getIdToken().then(token => {
                localStorage.removeItem('token', token)
            }).catch(e => console.log(e))
            await firebase.auth().signOut().then(() => {
                commit('setUser', null)

                localStorage.removeItem('user')
                router.push('/app')
            }).catch(e => commit('setError', e))
        },
        async getAllUsers({
            commit
        }) {
            commit('setLoading', true)
            try {
                await firebase.database().ref('users').once('value').then((snapshot) => {
                    commit('setAll', Object.values(snapshot.val()))
                })
            } catch (e) {
                commit('setError', e)
            }
            commit('setLoading', false)

        },

    },


}