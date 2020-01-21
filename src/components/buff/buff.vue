<template>
    <div class="buff">
        <div class="buffDiv" v-for="(item, index) in items" :key="index">
            <div @click="clickShow(item)" v-if="item['code'] == 'referrer_buff'" :class="item['code'] ">
                <p>{{txT['DUEDAY']}}
                    ：{{item['config']['effective']}}</p>
            </div>
            <!-- <img @click="clickShow(item)" v-if="item['code'] == 'referrer_tree_buff'"  src="~@/assets/images/buff/card_invite.png" alt="">
            <img @click="clickShow(item)" v-if="item['code'] == 'referrer_buff'" src="~@/assets/images/buff/card_inviteday.png" alt=""> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'buff',
        data() {
            return {
                items: []
            }
        },
        methods: {
            clickShow(item) {
                console.log(item)
                this.$store.dispatch('buffQrCode', {show: true, content: item})
                window.scroll(0, 0)
            },
            buff() {
                let data = {}
                data['url'] = this.$root.$options.api['api4']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        this.$store.dispatch('updateBuff', item)
                        this.items = item['data']['items']
                    }
                })
            }
        },
        computed: {
            txT() {
                return this.$root.$options['languageSet']
            }
        },
        mounted() {
            this.buff()
        }

    }
</script>