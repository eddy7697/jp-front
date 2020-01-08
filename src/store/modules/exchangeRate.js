const state = {
    sellRate: 0,
    buyRate: 0,
    sellSerial: '',
    buySerial: ''
}

const getters = {

}

const actions = {
    sellRate({commit, state}, payload) {
        commit('sellRate', payload)
    },
    buyRate({commit, state}, payload) {
        commit('buyRate', payload)
    },
    sellSerial({commit, state}, payload) {
        commit('sellSerial', payload)
    },
    buySerial({commit, state}, payload) {
        commit('buySerial', payload)
    }
}

const mutations = {
    sellRate(state, payload) {
        state.sellRate = payload;
    },
    buyRate(state, payload) {
        state.buyRate = payload;
    },
    sellSerial(state, payload) {
        state.sellSerial = payload;
    },
    buySerial(state, payload) {
        state.buySerial = payload;
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}