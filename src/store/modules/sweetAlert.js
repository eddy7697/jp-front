import router from '../../router'
import store from '../store';

const swal = require('sweetalert2')

const state = {
    alertText: '',
    confirmTxt: '',
    confirmTitle: '',
    reload: false,
}

const getters = {

}

const actions = {
    openAlert({commit, state}, error) {
        console.log(error)
        swal.fire({
            title: 'Error!',
            text: error.errorMsg.error.message,
            type: 'error',
            confirmButtonText: '確定'
        })
        commit('updateMember', )
    },
    redirectConfirm({commit, state}, confirmTxt) {
        commit('updateText', confirmTxt)
    }
}

const mutations = {
    updateText: (state, payload)=>{
        state.confirmTxt = payload['text']
        state.confirmTitle = payload['title']
        state.url = payload['url']
        swal.fire({
            title: state.confirmTitle,
            html: state.confirmTxt,
            type: 'success',
            confirmButtonText: '確定'
        }).then(result => {
            // redirection(payload)
            state.reload = payload['reload']
            // router.go(`${payload['url']}`)
            // commit('redirect', confirmTxt)
        })
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}