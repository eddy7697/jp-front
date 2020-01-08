<template>
    <div class="newsMarquee">
        <marquee width="100%">
            <div v-for="(item, index) in news" :key="item">
                <span v-html="item.content"></span>
            </div>
        </marquee>
    </div>
</template>

<script>
    export default {
        name: 'newsMarquee',
        data() {
            return {
                news: []
            }
        },
        components: {
        },
        methods: {
            toLoadRunningHorse () {
                let data = {}
                data['url'] = this.$root.$options.api['api40']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        item['data'].forEach((item)=>{
                            if(item['type'] == '3') {
                                this.news.push(item)
                            }
                        })
                    }
                })
            }
        },
        computed: {

        },
        mounted() {
            this.toLoadRunningHorse()
        }
    }
</script>

