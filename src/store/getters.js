const getters = {
    getUser: ({
        auth
    }) => auth.userData,
    isLogged: ({
        auth
    }) => auth.userData !== null,

    loading: ({
        common
    }) => common.loading,
    error: ({
        common
    }) => common.error,

    users: ({
        dashboard
    }) => dashboard.allUsers,

}

export default getters;