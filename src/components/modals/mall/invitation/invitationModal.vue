<template>
    <div class="invitationModal">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <img class="card-img" src="~@/assets/images/modals/invitation/invite_card.png" alt="" @click="closeModal()">
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="form-group col-12">
                        <label for="targetPerson">請填寫節點ID(非帳號)*</label><br/>
                        <small>查詢好友ID於[社群]或[我的好友]</small>
                        <input v-model="name" type="text" class="form-control" id="targetPerson" placeholder="">
                    </div>
                </div>
                <!-- <div class="row hidden">
                    <div class="form-group col-12">
                        <label for="position">社群位置</label>
                        <select v-model="position"  class="form-control" id="position">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div> -->
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-6 text-center">
                        <button class="cancelModal btn-lg text-center" @click="closeModal()">
                            {{this.$root.$options['languageSet']['CANCEL']}}
                        </button>
                    </div>
                    <div class="col-6 text-center">
                        <button class="confirmModal btn-lg text-center btn-primary" @click="confirmInvitation()">
                            {{this.$root.$options['languageSet']['CONFIRMTXT']}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import redirect from './../../../../redirect'
    export default {
        name: 'invitationModal',
        data(){
            return {
                name: '',
                position: { }
            }
        },
        methods: {
            closeModal() {
                this.$store.dispatch('invitationModal', {show: false, content: ''})
                this.$store.dispatch('toolConfirmModal', {show: false, content: ''})
            },
            confirmInvitation() {
                let data = {};
                data['url'] = `${this.$root.$options.api['api37']}${this.content.id}/use`

                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['features[0][code]'] = 'referrer_tree_buff'
                data['features[0][handle][node_uid]'] = this.name
                console.log(data)
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        this.$store.dispatch('invitationModal', {show: false, content: ''})
                        this.$store.dispatch('toolConfirmModal', {show: false, content: ''})
                        this.$store.dispatch('inviQrCodeModal', {'show': true, content: result['data']})
                    }
                })
            }

        },
        computed: {
            content() {
                return this.$store.state.modalControl.invitationModalContent
            }
        },
        mounted() {
        }
        
    }
</script>