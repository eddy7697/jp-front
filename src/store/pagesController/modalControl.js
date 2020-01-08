const state = {
    avatarModal: false,
    envelopeModal: false,
    envelopeModalContent: {},
    qrCodeModal: false,
    qrCodeToggle: false,
    payModal: false,
    noEcModal: false,
    cardModal: false,
    beforeBuyCard: false,
    newsModal: false,
    adsModal: false,
    lotteryModal: false,
    confirmSureReceive: false,
    confirmSureReceiveContent: {},
    toolConfirmModal: false,
    scModal: false,
    busyLoading: false,
    userRuleModal: false,
    buyingModal: false,
    sellModal: false,
    buyModal: false,
    authSellModal: false,
    authBuyModal: false,
    redEnvModal: false,
    redEnvModalContent: {},
    invitationModal: false,
    invitationModalContent: '',
    beforeBuyCardContent: '',
    cardModalContent: '',
    newsModalContent: '',
    toolConfirmModalContent: '',
    scModalContent: {
        name: '',
        uid: ''
    }
}

const actions = {
    avatarModal: ({commit, state}, payload)=> {
        commit('toggleAvatar', payload)
        window.scrollTo(0, 0)
    },
    enveModal: ({commit, state}, payload)=> {
        commit('toggleEnve', payload)
        window.scrollTo(0, 0)
    },
    qrCodeModal: ({commit, state}, payload)=> {
        commit('toggleQr', payload)
        window.scrollTo(0, 0)
    },
    qrCodeScanner: ({commit, state}, payload)=> {
        commit('qrCodeScanner', payload)
        window.scrollTo(0, 0)
    },
    payModal: ({commit, state}, payload)=> {
        commit('payModal', payload)
        window.scrollTo(0, 0)
    },
    noEcModal: ({commit, state}, payload)=> {
        commit('noEcModal', payload)
        window.scrollTo(0, 0)
    },
    cardModal: ({commit, state}, payload)=> {
        commit('cardModal', payload)
        window.scrollTo(0, 0)
    },
    beforeBuyCard: ({commit, state}, payload)=> {
        commit('beforeBuyCard', payload)
        window.scrollTo(0, 0)
    },
    newsModal: ({commit, state}, payload)=> {
        commit('newsModal', payload)
        window.scrollTo(0, 0)
    },
    adsModal: ({commit, state}, payload)=> {
        commit('adsModal', payload)
        window.scrollTo(0, 0)
    },
    lotteryModal: ({commit, state}, payload)=> {
        commit('lotteryModal', payload)
        window.scrollTo(0, 0)
    },
    toolConfirmModal: ({commit, state}, payload)=> {
        commit('toolConfirmModal', payload)
        window.scrollTo(0, 0)
    },
    scModal: ({commit, state}, payload)=> {
        commit('scModal', payload)
        window.scrollTo(0, 0)
    },
    confirmSureReceive: ({commit, state}, payload)=> {
        commit('confirmSureReceive', payload)
        window.scrollTo(0, 0)
    },
    busyLoading: ({commit, state}, payload)=> {
        commit('busyLoading', payload)
        window.scrollTo(0, 0)
    },
    userRuleModal: ({commit, state}, payload)=> {
        commit('userRuleModal', payload)
        window.scrollTo(0, 0)
    },
    buyingModal: ({commit, state}, payload)=> {
        commit('buyingModal', payload)
        window.scrollTo(0, 0)
    },
    sellModal: ({commit, state}, payload)=> {
        commit('sellModal', payload)
        window.scrollTo(0, 0)
    },
    authSellModal: ({commit, state}, payload)=> {
        commit('authSellModal', payload)
        window.scrollTo(0, 0)
    },
    authBuyModal: ({commit, state}, payload)=> {
        commit('authBuyModal', payload)
        window.scrollTo(0, 0)
    },
    buyModal: ({commit, state}, payload)=> {
        commit('buyModal', payload)
        window.scrollTo(0, 0)
    },
    redEnvModal: ({commit, state}, payload)=> {
        commit('redEnvModal', payload)
        window.scrollTo(0, 0)
    },
    invitationModal: ({commit, state}, payload)=> {
        commit('invitationModal', payload)
        window.scrollTo(0, 0)
    }
}

const mutations = {
    confirmSureReceive: (state, payload)=> {
        state['confirmSureReceive'] = payload['show']
        state['confirmSureReceiveContent'] = payload['content']
    },
    toggleAvatar: (state, payload)=> {
        state['avatarModal'] = payload
    },
    toggleEnve: (state, payload)=> {
        state['envelopeModal'] = payload['show']
        state['envelopeModalContent'] = payload['content']
    },
    toggleQr: (state, payload)=> {
        state['qrCodeModal'] = payload
    },
    qrCodeScanner: (state, payload)=> {
        state['qrCodeToggle'] = payload
    },
    payModal: (state, payload)=> {
        state['payModal'] = payload
    },
    noEcModal: (state, payload)=> {
        state['noEcModal'] = payload
    },
    adsModal: (state, payload)=> {
        state['adsModal'] = payload
    },
    lotteryModal: (state, payload)=> {
        state['lotteryModal'] = payload
    },
    scModal: (state, payload)=> {
        state['scModal'] = payload['show']
        state['scModalContent'] = payload['content']
    },
    cardModal: (state, payload)=> {
        state['cardModal'] = payload['show']
        state['cardModalContent'] = payload['content']
    },
    beforeBuyCard: (state, payload)=> {
        state['beforeBuyCard'] = payload['show']
        state['beforeBuyCardContent'] = payload['content']
    },
    newsModal: (state, payload)=> {
        state['newsModal'] = payload['show']
        state['newsModalContent'] = payload['content']
    },
    toolConfirmModal: (state, payload)=> {
        state['toolConfirmModal'] = payload['show']
        state['toolConfirmModalContent'] = payload['content']
    },
    busyLoading: (state, payload)=> {
        state['busyLoading'] = payload
    },
    userRuleModal: (state, payload)=> {
        state['userRuleModal'] = payload
    },
    buyingModal: (state, payload)=> {
        state['buyingModal'] = payload
    },
    sellModal: (state, payload)=> {
        state['sellModal'] = payload
    },
    authSellModal: (state, payload)=> {
        state['authSellModal'] = payload
    },
    authBuyModal: (state, payload)=> {
        state['authBuyModal'] = payload
    },
    buyModal: (state, payload)=> {
        state['buyModal'] = payload
    },
    redEnvModal: (state, payload)=> {
        state['redEnvModal'] = payload
    },
    invitationModal: (state, payload)=> {
        state['invitationModal'] = payload['show']
        state['invitationModalContent'] = payload['content']
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