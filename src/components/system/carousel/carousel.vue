<template>
    <div class="black-bg">
         <div class="carouselDiv" v-if="banners">
            <carousel 
            :loop="true"
            :items="1"
            :nav="true"
            :navText="['<',' >']"
            :autoplay="true"
            >
                <img v-for="(item, i) in banners" :key="i" :src="item['mobile']">
            </carousel>
        </div>
    </div>
</template>

<script>
    import carousel from 'vue-owl-carousel'

    export default {
        name: 'carouselDiv',
        props: {
        },
        components: { 
            carousel
        },
        data() {
            return {
                banners: null
            }
        },
        mounted() {
            let data = {}
            data['url'] = this.$root.$options.api['api12']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                if (item['result'] == 'error') {
                    this.$store.dispatch('openAlert', val)
                } else {
                    if(item['data'][0]) {
                        this.banners = item['data'][0]['images']['kv']
                    }
                }
            })
        }
    }
</script>