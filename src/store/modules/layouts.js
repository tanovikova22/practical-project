export default {
    state: {
        layout: 'AuthLayout'
    },

    matations: {
        setLayout(state, payload) {
            state.layout = payload
        }
    }
}