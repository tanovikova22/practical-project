import firebase from "firebase";
import router from './../../router'

export default {
    state: {
        userData: null,
        token: null
    },

    mutations: {
        setUser(state, payload) {
            state.userData = payload
        },

        setToken(state, payload){
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
                    router.push("/dashboard/users")
                    firebase.auth().currentUser.getIdToken().then(token => {
                        localStorage.setItem('token', (token))
                    }).catch(e => console.log(e))
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

                    router.push("/dashboard/users")
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

                router.push('/login')
            }).catch(e => commit('setError', e))
        },
    },


}