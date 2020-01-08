const state = {
    buffState: {},
    invitationQRAuth: ''
}

const getters = {

}

const actions = {
    updateBuff({commit, state}, payload){
        commit('updateBuff', payload)
    },
    invitationQRAuth({commit, state}, payload){
        commit('invitationQRAuth', payload)
    }
}

const mutations = {
    updateBuff(state, payload) { 
        state['buff'] = payload
    },
    invitationQRAuth(state, payload) { 
        state['invitationQRAuth'] = payload
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}