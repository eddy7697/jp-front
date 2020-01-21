<template>
    <div class="moveTreeModal">
        <div class="content">
            <div class="cancel">
                <img @click="cancelTreeModal()" src="~@/assets/images/modals/icon-cancel.png" />
            </div>
            <div class="container">
                <div class="row text-white">
                    <div class="container">
                        <h4>來源:</h4>
                        <div class="form-group col-12 text-white">
                            <label for="targetPerson">請填寫被轉移帳號ID(非帳號)*</label><br/>
                            <small>查詢好友ID於[社群]或[我的好友]</small>
                            <input v-model="childrenId" type="text" class="form-control" id="targetPerson" placeholder="">
                        </div>
                        <h4>目的</h4>
                        <div class="form-group col-12 text-white">
                            <label for="targetPerson">請填寫放置節點ID(非帳號)*</label><br/>
                            <small>查詢好友ID於[社群]或[我的好友]</small>
                            <input v-model="parentID" type="text" class="form-control" id="targetPerson" placeholder="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-6 text-center">
                        <button class="cancelModal btn-lg text-center" @click="cancelTreeModal()">
                            {{this.$root.$options['languageSet']['CANCEL']}}
                        </button>
                    </div>
                    <div class="col-6 text-center">
                        <button class="confirmModal btn-lg text-center btn-primary" @click="useCard()">
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
        name: 'moveTreeModal',
        methods: {
            cancelTreeModal() {
                this.$store.dispatch('moveTreeModal', false)
            },
            useCard() {
                let data = {};
                data['url'] = `${this.$root.$options.api['api22']}${this.parentID}/${this.childrenId}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['features[0][code]'] = this.movetreeId['features']['0']['code']
                data['parent_node_uid'] = this.parentID
                data['node_uid'] = this.childrenId
                console.log(data)
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        this.cancelTreeModal()
                        redirect.redirect('/#/Group', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            },
            // confirmInvitation() {
            //     let data = {};
            //     data['url'] = `${this.$root.options.api['api22']}${this.uid}/${this.childrenId}`
            //     data['Authorization'] = localStorage.getItem('Authorization')
            //     data['identity_token'] = localStorage.getItem('identity')
            //     data['parent_node_uid'] = this.uid
            //     data['node_uid'] = this.childrenId
                
            //     console.log(data)
            //     this.$store.dispatch('postApi', data).then((result)=>{
            //         if (result['result'] == 'error') {
            //             console.log(result)
            //             this.$store.dispatch('openAlert', result)
            //         } else {
            //             this.closeModal()
            //             redirect.redirect('/#/Group', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)

            //             // console.log(result)
            //             // let set = {};
            //             // set['text'] = ''
            //             // set['title'] = '成功'
            //             // set['url'] = 'group'
            //             // this.$store.dispatch('redirectConfirm', set)
            //         }
            //     })
            // }
        },
        data() {
            return {
                childrenId: '',
                parentID:''
            }
        },
        computed: {
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            },
            name() {
                return this.$store.state.memberInfo.userInfo.nickname
            },
            auth() {
                return this.$store.state.modalControlOne.inviQrCodeModalContent['features'][0]['handle']['auth']
            },
            returnCopyUrl() {
                return `${process.env.VUE_APP_DOMAIN_URL}?Registration=true&auth=${this.auth}`
            },
            movetreeId() {
                return this.$store.state.modalControlOne.moveTreeModalContent
            }
        },
        mounted(){
        }
    }
</script>