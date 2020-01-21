<template>
    <div class="confirmSureReceive">
        <div class="content">
            <img class="del" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <i class="fa fa-exclamation-circle"></i>
                    </div>
                    <div class="col-12 hidden ">
                        <h2 class="text-center">領取金額低於回饋幣餘額</h2>
                    </div>
                    <div class="col-12 text-center">
                        <h5 class="text-danger text-center">提醒!</h5>
                        <h5 class="text-danger text-left">若您的回饋幣分數小於應領取禮券分數，則只能領取等於回饋幣分數之禮券。</h5>
                    </div>
                    <div class="col-12 text-center" style="margin: 15px 0px;">
                        <h5>您的回饋幣分數餘額: {{ucoin}}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 text-center">
                        <div class="btn btn-lg btn-danger" @click="closeModal()">
                            {{this.$root.$options['languageSet']['CANCEL']}}
                        </div>
                    </div>
                    <div class="col-6 text-center">
                        <div class="btn btn-lg btn-primary" @click="putApi()">
                            領取
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'confirmSureReceive',
        methods: {
             putApi() {
                let data = {};
                data['url'] = `${this.$root.$options.api['api42']}/${this.item.type}/${this.item.id}/receive`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                        let set = {};
                        set['text'] = this.$root.$options['languageSet']['ALREADIRECIVED']
                        set['title'] = '完成'
                        set['url'] = '/receivePage'
                        set['reload'] = true
                        redirect.redirect('/#/receivePage', '完成', this.$root.$options['languageSet']['ALREADIRECIVED'], 'success', true)  
                    }
                })
            },
            closeModal() {
                this.$store.dispatch('confirmSureReceive', {show: false, content: '' })
            }
        },
        computed: {
            item() {
                return this.$store.state.modalControl.confirmSureReceiveContent
            },
            ucoin() {
                return Number(this.$store.state.memberInfo.userInfo.ucoin).toLocaleString()
            },
        }
    }
</script>