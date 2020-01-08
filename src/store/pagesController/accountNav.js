const state = {
    accountNavPosition: '2',
    toggleSide: false
}

const actions = {
    accountNavChange: ({commit, state}, payload)=> {
        commit('changeNav', payload)
    },
    toggleNav: ({commit, state}, payload)=> {
        commit('toggleSideNav', payload)
    }
}

const mutations = {
    changeNav: (state, payload)=> {
        state['accountNavPosition'] = payload
    },
    toggleSideNav: (state, payload)=> {
        state['toggleSide'] = payload
    }
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