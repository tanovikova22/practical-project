const getters = {
    getUser: ({
        auth
    }) => auth.userData,
    isLogged: ({
        auth
    }) => auth.user !== null,

    loading: ({
        common
    }) => common.loading,
    getError: ({
        common
    }) => common.error,

    users: ({
        dashboard
    }) => dashboard.allUsers,

}

export default getters;