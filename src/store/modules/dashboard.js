import firebase from "firebase";



export default {

    state: {
        allUsers: null,
    },

    mutations: {
        setAllUsers(state, payload) {
            state.allUsers = payload
        }
    },

    actions: {
        async getAllUsers({
            commit
        }) {
            commit('setLoading', true)
            try {
                await firebase.database().ref('users').once('value').then((snapshot) => {
                    commit('setAllUsers', Object.values(snapshot.val()))
                })
            } catch (e) {
                commit('setError', e)
            }
            commit('setLoading', false)

        },

    }

}