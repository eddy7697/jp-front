const state = {
    show: false
}

const actions = {
    navBarShow: ({commit, state}, payload)=> {
        commit('navBarShow', payload)
    }
}

const mutations = {
    navBarShow: (state, payload)=> {
        state['show'] = payload
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