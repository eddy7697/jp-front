<template>
    <div class="tradeArea">
        <div class="price-area">
            <div class="uCoin">
            <img id="UCoin" class="uDiv img-responsive" src="~@/assets/images/tradePanel/U.png" alt="">
            </div>
            <h2 class="newest">{{currency}}</h2>
            <h2 class="balance">{{quantity}}</h2>
            <img id="tradePanel" class="img-responsive" src="~@/assets/images/tradePanel/tradePanel_phone.png" alt="">
            </div>
            <div class="trade-button">
                <img class="img-responsive" @click="redirect('trade')" src="~@/assets/images/tradePanel/btn_buy_s.gif" alt="">
                <img class="img-responsive" @click="redirect('trade')" src="~@/assets/images/tradePanel/btn_sell_s.gif" alt="">
            </div>
        </div>
</template>
<script>
    
    export default {
        name: 'tradeArea',
        data() {
            return {
                currency: '0',
                quantity: '0'
            }
        },
        prop: {

        },
        methods: {
            redirect(url) {
                this.$router.push(url)
            }
        },
        mounted(){
            let data = {}
            data['url'] = this.$root.$options.api['api34']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                if (item['result'] == 'error') {
                    this.$store.dispatch('openAlert', item)
                } else {
                    this.currency = item['data']['currency'] = 2.39;
                    this.quantity = item['data']['quantity'] = 9999999000;
                }
            })
        }
    }

</script>