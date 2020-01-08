<template>
    <div class="mallCenter">
        <div class="container">
            <div class="row">
                <div id="cardArea" class="col-12 text-center">
                    <div class="card-item" v-for="(card, i) in cards" :key="i">
                        <img @click="showModal(card.description)" v-if="card.images.main" class="tool-pic" :src="card.images.main[0]['mobile']" alt="">
                        <!-- <span class="card-name">{{card.name}}</span> -->
                        <span class="stock">{{card.name}}</span>
                        <!-- <span class="desc" v-html="card.description"></span> -->
                        <span class="price">{{cardPrice(card.price)}}</span>
                        <button @click="buy(card)">購買</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'mallCenter',
        data(){
            return {
                cards: null
            }
        },
        computed: {
        },
        methods:{
            cardPrice(price) {
                console.log(price)
                return Number(price).toLocaleString()
            },
            buy(item) {
                this.$store.dispatch('beforeBuyCard', {show: true, content: item})
            },
            showModal(desc) {
                this.$store.dispatch('cardModal', {show: true, content: desc})
            }
        },
        mounted() {
            let data = {}
            data['url'] = `${this.$root.$options.api['api36']}?page=1&rows=15`
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                if (item['result'] == 'error') {
                    this.$store.dispatch('openAlert', val)
                } else {
                    this.cards = item['data']
                }
            })
        }
    }
</script>