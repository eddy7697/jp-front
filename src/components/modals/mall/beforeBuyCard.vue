<template>
    <div class="beforeBuyCard">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row">
                    <div id="desc" v-html="content.description"></div>
                </div>
                <div class="row">
                    <div class="btn col-6 btn-danger" @click="closeModal()">
                        {{this.$root.$options['languageSet']['CANCEL']}}
                    </div>
                    <div class="btn col-6 btn-primary" @click="confirmBuy(content)">
                        {{this.$root.$options['languageSet']['CONFIRMTXT']}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import redirect from './../../../redirect'

export default {
    name: 'beforeBuyCard',
    methods:{
        closeModal() {
            this.$store.dispatch('beforeBuyCard', {show: false, content: ''})
        },
        confirmBuy(item) {
                let data = {};
                data['url'] = `${this.$root.$options.api['api48']}${item.id}/buy`;
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['id'] = item.id;
                this.$store.dispatch('postApi', data).then((result)=>{
                if (result['result'] == 'error') {
                    this.$store.dispatch('openAlert', result)
                } else {
                    this.$store.dispatch('beforeBuyCard', {show: false, content: ''})
                    this.$store.dispatch('mallNav', '1')
                    redirect.redirect('/#/mall', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                }
            })
        }
    },
    computed:{
        content() {
            return this.$store.state.modalControl.beforeBuyCardContent
        }
    }
}
</script>
