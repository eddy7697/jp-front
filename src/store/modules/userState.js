const state = {
  account: '',
  password: '',
}

const getters = {

}

const actions = {
    updateUserState({commit, state}, data) {
        commit('mutateUserState', data)
    }
}

const mutations = {
    mutateUserState(state, payload) {
        if (payload.account)
        state.account = payload.account
        if (payload.password)
        state.password = payload.password
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}