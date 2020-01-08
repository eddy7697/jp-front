const state = {
    activeMain: false,
    activeShopping: false,
    activeTrade: false,
    activeGame: false,
    activeGroup: false,
    activeAccount: false,
}

const actions = {
    updatedLink({commit, state}, data) {
        commit('updateLinkState', data)
    }
}

const mutations = {
    updateLinkState(state, payload) {
        state['activeMain'] = payload['activeMain']
        state['activeShopping'] = payload['activeShopping']
        state['activeGame'] = payload['activeGame']
        state['activeTrade'] = payload['activeTrade']
        state['activeGroup'] = payload['activeGroup']
        state['activeAccount'] = payload['activeAccount']
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