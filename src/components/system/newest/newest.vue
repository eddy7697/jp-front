<template>
    <div class="Newest">
        <div class="newTitle">
            <h4>{{txT['NEWS']}}</h4>
        </div>
        <div v-for="(item, index) in newsList" :key="index">
            <p>{{item.title}}</p>
            <span>{{item.post_at}}</span>
            <span @click="goToMore()">
                <img class="more" src="~@/assets/images/news/more.png" alt="">
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Newest',
        data(){
            return {
                newsList: null
            }
        },
        props: {

        },
        methods: {
            goToMore() {
                this.$router.push('Newest')
            }
        },
        computed: {
            txT(){
                return this.$root.$options['languageSet']
            }
        },
        mounted() {
            let data = {}
            data['url'] = this.$root.$options.api['api40']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                if (item['result'] == 'error') {
                    this.$store.dispatch('openAlert', item)
                } else {
                    this.newsList = item['data']
                }
            })
        }
    }

</script>