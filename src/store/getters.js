const getters = {
    getUser: ({ auth }) => auth.user,
    isLogged: ({ auth }) => auth.user !== null,

    getLoading: ({ common }) => common.loading,
    getError: ({ common }) => common.error,

    getLayout: ({ layouts }) => layouts.layout
}

export default getters;