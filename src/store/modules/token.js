const state = {
}

const getters = {

}

const actions = {
    updateToken({commit, state}, payload){
        console.log(payload)
        localStorage.setItem('Authorization', `${payload['data']['token_type']} ${payload['data']['access_token']}`)
        if(payload['data']['access_token'])
        localStorage.setItem('access_token', `${payload['data']['access_token']}`)
        if(payload['data']['token_type'])
        localStorage.setItem('token_type', `${payload['data']['token_type']}`)
        if(payload['data']['expires_in'])
        localStorage.setItem('expires_in', `${payload['data']['expires_in']}`)
        if(payload['data']['identity_token'])
        localStorage.setItem('identity', `${payload['data']['token_type']} ${payload['data']['identity_token']}`)
    }
}

const mutations = {
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}