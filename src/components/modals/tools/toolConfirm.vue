<template>
    <div class="toolConfirmModal">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row">
                    <div id="cardContentDesc" v-html="content.description"></div>
                </div>
                <div class="row">
                    <div id="btnFooter" class="col-12 text-center">
                        <button type="button" @click="closeModal()" class="btn btn-secondary">{{this.$root.$options['languageSet']['CANCEL']}}</button>
                        <button type="button" class="btn btn-primary" @click="useCard(content)">使用</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import redirect from './../../../redirect'
import axios from 'axios'
export default {
    name: 'toolConfirmModal',
    methods:{
        closeModal() {
            this.$store.dispatch('toolConfirmModal', {show: false, content: ''})
        },
        openNewWin(item) {
            var windowReference = window.open()
            windowReference.location = item
        },
        implyCard(item) { 
            let data = {};
            data['url'] = `${this.$root.$options.api['api37']}${item.id}/use`
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity_token'] = localStorage.getItem('identity')
            data['features[0][code]'] = item['features']['0']['code']
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
        },
        detect() {
            var ua = navigator.userAgent.toLowerCase(); 
            if (ua.indexOf('safari') != -1) { 
                if (ua.indexOf('chrome') > -1) {
                    return false// Chrome
                } else {
                    return true// Safari
                }
            }
        },
        useCard(item) {
            if(item['features']['0']['code'] == "referrer_buff") {
                this.implyCard(item)
                return
            }
            if(item['features']['0']['code'] == "referrer_tree_buff") {
                this.$store.dispatch('invitationModal', {show: true, content: item})
                return
            }
            if(item['features']['0']['code'] == "transfer_gold"){
                this.$store.dispatch('toolConfirmModal', {show: false, content: ''})
                this.$store.dispatch('redEnvModal', true)
                return
            }
            if(item['features']['0']['code'] == "trade_expenses") {
                this.$router.push('/trade')
                this.$store.dispatch('authSellModal', true)
                this.$store.dispatch('toolConfirmModal', {show: false, content: ''})
                return
            }
            if(item['features']['0']['code'] == "trade_income") {
                this.$router.push('/trade')
                this.$store.dispatch('authBuyModal', true)
                this.$store.dispatch('toolConfirmModal', {show: false, content: ''})
                return
            }
            if(item['features']['0']['code'] == "move_tree_node") {
                this.$store.dispatch('moveTreeModal', {show: true, content: item})
                this.$store.dispatch('toolConfirmModal', {show: false, content: ''})
                return
            }
            let data = {};
            data['url'] = `${this.$root.$options.api['api37']}${item.id}/use`;
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity_token'] = localStorage.getItem('identity')

            this.$store.dispatch('putApi', data).then((result)=>{
                if (result['result'] == 'error') {
                    this.$store.dispatch('openAlert', result)
                    windowReference.close()
                } else {
                    if(result['data']['features']) {
                        result['data']['features'].forEach((el)=>{
                            if(el['code'] == 'level_settles_now_record') {
                                 if(!this.detect()){
                                    this.openNewWin(el['handle']['file'])
                                 } else {
                                    window.location = el['handle']['file']
                                 }
                                 this.$store.dispatch('toolConfirmModal', {show: false, content: ''})
                                 redirect.redirect('/#/mall', '成功', '您已成功使用報表功能', 'success')
                                 return
                            } else {
                                redirect.redirect('/#/mall', '成功', this.$root.$options['languageSet']['EDITSUCCESS'], 'success', true)
                                this.$store.dispatch('toolConfirmModal', {show: false, content: ''})
                            }
                        })
                    } else {
                        
                    }
                }
            })
        },
    },
    computed:{
        content() {
            return this.$store.state.modalControl.toolConfirmModalContent
        }
    },
    mounted() {
        // window.open('https://ulg168-web-stage-data.s3.ap-northeast-1.amazonaws.com/report/level/2019/7/177501775.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIBI7BWSS6OTQWD3A%2F20190731%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20190731T082438Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=ef6be2ed94a2391d889989c3cea82961390aa472c67f1135eac196de4d25fea2')
    }
}
</script>
