<template>
    <div class="note">
        <div class="content">
            <img class="del" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <h4>編輯備註</h4>
            <div class="container">
               <div class="form-group">
                    <label for="textNote">備註:</label>
                    <textarea v-model="noteContent" class="form-control rounded-0" id="textNote" rows="10"></textarea>
                </div>
                <div class="form-group text-center">
                    <button class="btn btn-lg btn-success" @click="toSendNote()">確認</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const swal = require('sweetalert2')
    import redirect from './../../../redirect'

    export default {
        name: 'note',
        data() {
            return {
                noteContent: ''
            }
        },
        methods: {
            closeModal () {
                this.$store.dispatch('noteModal', {show: false, content: ''})
            },
            toSendNote() {
                console.log(this.content)
                console.log(this.noteContent)
                console.log(this.content.number)
                let data = {};
                data['url'] = `${this.$root.$options.api['api7']}${this.content.number}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['description'] = this.noteContent
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        redirect.redirect('/#/contractShop', '失敗', result.errorMsg.error.message, 'error')
                    } else {
                        redirect.redirect('/#/contractShop', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            }
        },
        computed: {
            content() {
                this.noteContent = this.$store.state.contractShop.noteModalContent['item']['description']
                return this.$store.state.contractShop.noteModalContent['item']
            }
        },
        mounted() {
            this.content
        }
    }
</script>