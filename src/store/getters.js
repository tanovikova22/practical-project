const getters = {
    getUser: ({
        auth
    }) => auth.userData,
    isLogged: ({
        auth
    }) => auth.user !== null,

    getLoading: ({
        common
    }) => common.loading,
    getError: ({
        common
    }) => common.error,

    getAll: ({
        dashboard
    }) => dashboard.allUsers,

}

export default getters;