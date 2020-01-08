<template>
    <div class="myTool">
        <div class="container">
            <div class="row">
                <div id="cardArea" class="col-12 text-center">
                    <div class="card-item" v-for="(card, i) in cards" :key="i">
                        <img @click="showModal(card.description)" v-if="card.images.main" class="tool-pic" :src="card.images.main[0]['mobile']" alt="">
                        <span id="tool-name" class="card-name"></span>
                        <span class="stock">{{card.name}}</span>
                        <span class="desc">商品擁有: {{card.amount}}</span>
                        <!-- <span class="price">{{card.price}}</span> -->
                        <button id="blue-link" @click="confirmUse(card)">使用</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'myTool',
        data(){
            return {
                cards: null
            }
        },
        methods:{
            showModal(desc) {
                this.$store.dispatch('cardModal', {show: true, content: desc})
            },
            confirmUse(desc) {
                this.$store.dispatch('toolConfirmModal', {show: true, content: desc})
            }
        },
        mounted() {
            let data = {}
            data['url'] = `${this.$root.$options.api['api35']}?page=1&rows=15`
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                 if (item['result'] == 'error') {
                    this.$store.dispatch('openAlert', val)
                } else {
                    this.cards = item['data']['items']
                    console.log(this.cards)
                }
            })
        }
    }
</script>