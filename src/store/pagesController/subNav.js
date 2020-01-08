const state = {
    mallNav: '2',
    tradeSubNav: '2',
    gameSec: '2',
    depositNav: '2',
    coinSubNav: 'all',
    depositTable: false
}

const actions = {
    mallNav: ({commit, state}, payload)=> {
        commit('mallNav', payload)
    },
    tradeSubNav: ({commit, state}, payload)=> {
        commit('tradeSubNav', payload)
    },
    gameSec: ({commit, state}, payload)=> {
        commit('gameSec', payload)
    },
    coinSubNav: ({commit, state}, payload)=> {
        commit('coinSubNav', payload)
    },
    depositTable: ({commit, state}, payload)=> {
        commit('depositTable', payload)
    },
    depositNav: ({commit, state}, payload)=> {
        commit('depositNav', payload)
    }
}

const mutations = {
    tradeSubNav: (state, payload)=> {
        state['tradeSubNav'] = payload
    },
    mallNav: (state, payload)=> {
        state['mallNav'] = payload
    },
    gameSec: (state, payload)=> {
        state['gameSec'] = payload
    },
    coinSubNav: (state, payload)=> {
        state['coinSubNav'] = payload
    },
    depositTable: (state, payload)=> {
        state['depositTable'] = payload
    },
    depositNav: (state, payload)=> {
        state['depositNav'] = payload
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