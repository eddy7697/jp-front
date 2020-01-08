const state = {
    forgetPassword: false,
    freeToGo: false
}

const actions = {
    forgetPw: ({commit, state}, payload)=> {
        commit('forgetPw', payload)
    },
    freeToGo: ({commit, state}, payload)=> {
        commit('freeToGo', payload)
    }
}

const mutations = {
    forgetPw: (state, payload)=> {
        state['forgetPassword'] = payload
    },
    freeToGo: (state, payload)=> {
        state['freeToGo'] = payload
    },
}

const getters = {

}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}