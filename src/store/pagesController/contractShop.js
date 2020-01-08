const state = {
    openItem: false,
    item: {},
    toggleTable: false,
    tradeReceipt: false,
    evaluateModal: false,
    noteModal: false,
    tradeReceiptContent: {},
    evaluateModalContent: {},
    noteModalContent: {},
    subNavNu: 1,
    filterItem: '',
    categoryPage: 1,
}

const actions = {
    categoryPage: ({commit, state}, payload)=> {
        commit('categoryPage', payload)
    },
    openItem: ({commit, state}, payload)=> {
        commit('toggleItem', payload)
    },
    toggleTable: ({commit, state}, payload)=> {
        commit('toggleTable', payload)
    },
    tradeReceipt: ({commit, state}, payload)=> {
        commit('tradeReceipt', payload)
        window.scrollTo(0, 0)
    },
    noteModal: ({commit, state}, payload)=> {
        commit('noteModal', payload)
        window.scrollTo(0, 0)
    },
    subNavNu: ({commit, state}, payload)=> {
        commit('subNavNu', payload)
        window.scrollTo(0, 0)
    },
    evaluateModal: ({commit, state}, payload)=> {
        commit('evaluateModal', payload)
        window.scrollTo(0, 0)
    },
    filterItem: ({commit, state}, payload)=> {
        commit('filterItem', payload)
        window.scrollTo(0, 0)
    },
}

const mutations = {
    categoryPage: (state, payload)=> {
        state['categoryPage'] = payload
    },
    toggleItem: (state, payload)=> {
        state['openItem'] = payload['openItem']
        state['item'] = payload['item']
    },
    toggleTable: (state, payload)=> {
        state['toggleTable'] = payload
    },
    tradeReceipt: (state, payload)=> {
        state['tradeReceipt'] = payload['show']
        state['tradeReceiptContent'] = payload['content']
    },
    noteModal: (state, payload)=> {
        state['noteModal'] = payload['show']
        state['noteModalContent'] = payload['content']
    },
    evaluateModal: (state, payload)=> {
        state['evaluateModal'] = payload['show']
        state['evaluateModalContent'] = payload['content']
    },
    subNavNu: (state, payload)=> {
        state['subNavNu'] = payload
    },
    filterItem: (state, payload)=> {
        state['filterItem'] = payload
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