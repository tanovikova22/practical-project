export default {
    state: {
        loading: false,
        error: ''
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        }
    },

    getters: {
        getLoading(state) {
            return state.loading
        },
        getError(state) {
            return state.error
        }
    }
}