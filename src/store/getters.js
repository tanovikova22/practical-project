const getters = {
    getUser: ({ auth }) => auth.userData,
    isLogged: ({ auth }) => auth.user !== null,
    getAll: ({ dashboard }) => dashboard.allUsers,

    getLoading: ({ common }) => common.loading,
    getError: ({ common }) => common.error,
    
}

export default getters;