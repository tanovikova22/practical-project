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
    }
}