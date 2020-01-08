const state = {
    title: '',
    content: '',
}

const actions = {
    changeEditForm: ({commit, state}, payload)=> {
        commit('changeEditForm', payload)
    }
}

const mutations = {
    changeEditForm: (state, payload)=> {
        state['title'] = payload['title']
        state['content'] = payload['content']
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