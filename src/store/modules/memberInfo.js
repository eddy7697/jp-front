const state = {
    userInfo: ''
}

const getters = {

}

const actions = {
    updateMember({commit, state}, payload) {
        commit('updatedMemberInfo', payload)
    }
}

const mutations = {
    updatedMemberInfo(state, payload) {
        state.userInfo = payload;
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}