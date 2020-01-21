<template>
    <div class="openGroupModal">
        <div class="content">
            <img src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row">
                    <div class="form-group col-12">
                        <label for="targetPerson">請填寫節點ID(非帳號)*</label><br/>
                        <small>查詢好友ID於[社群]或[我的好友]</small>
                        <input v-model="childrenId" type="text" class="form-control" id="targetPerson" placeholder="">
                    </div>
                </div>
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
    import redirect from './../../../redirect'

    export default {
        name: 'openGroupModal',
        data(){
            return {
                name: '',
                position: { },
                childrenId: ''
            }
        },
        props: {
            parentId: ''
        },
        methods: {
            closeModal() {
                this.$store.dispatch('openGroupModal', {show: false, content: ''})
            },
            confirmInvitation() {
                let data = {};
                data['url'] = `${this.$root.$options.api['api21']}${this.childrenId}/${this.parentId}`

                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                console.log(data)
                
                this.$store.dispatch('postApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log(result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        this.closeModal()
                        redirect.redirect('/#/Group', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)

                        // console.log(result)
                        // let set = {};
                        // set['text'] = ''
                        // set['title'] = '成功'
                        // set['url'] = 'group'
                        // this.$store.dispatch('redirectConfirm', set)
                    }
                })
            }

        },
        computed: {
            // parentId() {
            //     return this.$store.state.memberInfo.userInfo.uid
            // }
        },
        mounted() {
            window.scroll(0, 0)
        }
        
    }
</script>