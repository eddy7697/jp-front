<template>
    <div class="evaluateModal">
        <div class="content">
            <img class="del" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeWin()">
            <div class="container">
                <div class="row">
                    <div class="form-group col-12">
                        <label for="rating">評價</label>
                        <select v-model="rating" class="form-control" id="rating">
                        <option value="1">1 顆星(有待加強)</option>
                        <option value="2">2 顆星(尚可)</option>
                        <option value="3">3 顆星(普通)</option>
                        <option value="4">4 顆星(不錯)</option>
                        <option value="5">5 顆星(很讚)</option>
                        </select>
                    </div>
                    <!-- <div class="form-group col-12 hidden">
                        <label for="comment">評論</label>
                        <textarea v-model="comments" class="form-control" id="comment" rows="3">
                            
                        </textarea>
                    </div> -->
                </div>
                <div class="row text-center">
                    <div class="col-12">
                        <button class="btn-lg btn-success" @click="doneRate()">
                            確認
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
        name: 'evaluateModal',
        components: {
        },
        data() {
            return {
                rating: 4,
                comments: ''
            }
        },
        methods: {
            closeWin() {
                this.$store.dispatch('evaluateModal', {show: false, content: ''})
            },
            doneRate() {
                let data = {};
                data['url'] = `${this.$root.$options.api['api6']}/${this.getContent.contract_store_id}/rating`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['rating'] = this.rating
                data['comment'] = null
                data['order_number'] = this.getContent.number
                console.log(data)
                let i = this.$store.dispatch('postApi', data);
                i.then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                        // let set = {};
                        // set['text'] = this.$root.$options['languageSet']['YOURALREADISUCCESS']
                        // set['title'] = '成功'
                        // set['url'] = 'contractShop'
                        // this.$store.dispatch('redirectConfirm', set)
                        redirect.redirect('/#/contractShop', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                    }
                })
            }
        },
        computed: {
            getContent() {
                console.log(this.$store.state.contractShop.evaluateModalContent['item'])
                return this.$store.state.contractShop.evaluateModalContent['item']
            }
        },
        mounted() {
            console.log(this.getContent)
        }
    }
</script>