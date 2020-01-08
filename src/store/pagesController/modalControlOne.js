const state = {
    inviQrCodeModalShow: false,
    inviQrCodeModalContent: '',
    buffQrCode: false,
    buffQrCodeContent: '',
    regiSMS: false,
    regiSuccess: false,
    withdrawModal: false,
    qrGroupCode: false,
    qrGroupCodeContent: '',
    openGroupModal: false,
    openGroupModalContent: '',
    moveTreeModal: false,
    moveTreeModalContent:''
}

const actions = {
    inviQrCodeModal: ({commit, state}, payload)=> {
        commit('inviQrCodeModal', payload)
    },
    qrGroupCode: ({commit, state}, payload)=> {
        commit('qrGroupCode', payload)
    },
    buffQrCode: ({commit, state}, payload)=> {
        commit('buffQrCode', payload)
    },
    moveTreeModal: ({commit, state}, payload)=> {
        commit('moveTreeModal', payload)
    },
    regiSMS: ({commit, state}, payload)=> {
        commit('regiSMS', payload)
    },
    regiSuccess: ({commit, state}, payload)=> {
        commit('regiSuccess', payload)
    },
    withdrawModal: ({commit, state}, payload)=> {
        commit('withdrawModal', payload)
    },
    openGroupModal: ({commit, state}, payload)=> {
        commit('openGroupModal', payload)
    },
}

const mutations = {
    openGroupModal: (state, payload)=> {
        state['openGroupModal'] = payload['show']
        state['openGroupModalContent'] = payload['content']
    },
    inviQrCodeModal: (state, payload)=> {
        state['inviQrCodeModalShow'] = payload['show']
        state['inviQrCodeModalContent'] = payload['content']
    },
    buffQrCode: (state, payload)=> {
        state['buffQrCode'] = payload['show']
        state['buffQrCodeContent'] = payload['content']
    },
    qrGroupCode: (state, payload)=> {
        state['qrGroupCode'] = payload['show']
        state['qrGroupCodeContent'] = payload['content']
    },
    regiSMS: (state, payload)=> {
        state['regiSMS'] = payload
    },
    regiSuccess: (state, payload)=> {
        state['regiSuccess'] = payload
    },
    withdrawModal: (state, payload)=> {
        state['withdrawModal'] = payload
    },
    moveTreeModal: (state, payload)=> {
        state['moveTreeModal'] = payload['show']
        state['moveTreeModalContent'] = payload['content']
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