<template>
    <div class="contractShopCarousel">
         <div class="carouselDiv" v-if="banners">
            <carousel 
            :loop="true"
            :items="1"
            :nav="true"
            :navText="['<',' >']"
            :autoplay="true"
            >
                <div v-for="(item, index) in banners" :key="index">
                    <a v-if="item['property']" :href="item['property']['link']">
                        <img :src="item['mobile']">
                    </a>
                    <img v-else :src="item['mobile']">
                </div>
            </carousel>
        </div>
    </div>
</template>

<script>
    import carousel from 'vue-owl-carousel'

    export default {
        name: 'contractShopCarousel',
        props: {
            item: null
        },
        components: { 
            carousel
        },
        methods: {
            redirect() {
                this.$router.push('editUserForm')
            }
        },
        computed: {
            computedBanners() {
                if(this.item){
                    this.banners = this.item['images']['main']
                } else {
                    let data = {}
                    data['url'] = this.$root.$options.api['api12']
                    data['Authorization'] = localStorage.getItem('Authorization')
                    data['identity'] = localStorage.getItem('identity')
                    this.$store.dispatch('getApi', data).then((item)=>{
                        if (item['result'] == 'error') {
                            this.$store.dispatch('openAlert', val)
                        } else {
                            // this.banners = [
                            //     {
                            //         property: {
                            //             link: '/#/editUserForm'
                            //         },
                            //         mobile: require('@/assets/images/banners/giftBanner.gif')
                            //     }
                            // ]
                            this.banners = []
                            item['data'][1]['images']['store'].forEach((item)=>{
                                this.banners.push(item)
                            })
                        }
                    })
                }
            }
        },
        data() {
            return {
                banners: null
            }
        },
        mounted() {
            this.computedBanners
        }
    }
</script>