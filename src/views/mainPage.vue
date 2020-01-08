<template>
    <div class="mainPage">
        <mainPageCarousel />
        <div id="firstRow" class="row">
            <div class="col-xl-12 p-0">
                <shopIndex />
                <div class="row">
                    <div id="adsRow" class="container-fluid p-0">
                        <img style="width:100%;cursor:pointer;" @click="redirect('editUserForm')" class="img-responsive" src="@/assets/images/mainPage/ads/index-bonus.png" alt="">
                        <div class="container p-0" style="padding-left: 0px; padding-right: 0px;">
                            <h5>
                                您好啊 ~ <span class="name_txt">{{name}}</span>
                            </h5>
                            <hr>
                            <div class="row">
                                <span class="col-3 p-0">
                                    <img style="width:100%;" class="img-responsive" src="@/assets/images/mainPage/spin_gift_coin.gif" alt="">
                                </span>
                                <span id="specilRowPadding" class="col-9">
                                    <ul>
                                        <li>   
                                            <span class="circleRound text-center">
                                                我的禮券
                                            </span>
                                            <span class="number">
                                                {{gift}}
                                            </span>
                                        </li>   
                                        <li>
                                            <span class="circleRound text-center">
                                                立即折抵
                                            </span>
                                            <span class="number">
                                                {{giftDivide}}
                                            </span>
                                        </li>
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="col-xl-6 p-0">
                <gameIndex />
            </div> -->
        </div>
        <!-- <adsModal v-if="adsModal" src="ads.png" link="https://line.me/R/ti/p/%40299ttbvy" /> -->
        <lottery v-if="lotteryModal" :count="count" />
    </div>
    
</template>

<script>
    import mainPageCarousel from '@/components/mainPage/carousel'
    import shopIndex from '@/components/mainPage/shopIndex'
    import gameIndex from '@/components/mainPage/gameIndex'
    import adsModal from '@/components/modals/ads/adsModal'
    import lottery from '@/components/modals/lottery/lottery'
    export default {
        name: 'mainPage',
        components: {
            mainPageCarousel,
            shopIndex,
            gameIndex,
            adsModal,
            lottery
        },
        data() {
            return {
                count: null
            }
        },
        methods: {
            redirect(url) {
                this.$router.push(url)
            },
            getStatus() {
                let data = {}
                data['url'] = `api/v1/sign_in/count`    
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        this.count = item['data']['count']
                        if(this.count !== null && this.count <= 7) {
                            this.$store.dispatch('lotteryModal', true)
                        } else {
                        }
                    }
                })
            }
        },
        computed: {
            gift() {
                return Number(this.$store.state.memberInfo.userInfo.gift).toLocaleString()
            }, 
            adsModal() {
                return this.$store.state.modalControl.adsModal
            },
            lotteryModal() {
                return this.$store.state.modalControl.lotteryModal
            },
            name() {
                return this.$store.state.memberInfo.userInfo.nickname ? this.$store.state.memberInfo.userInfo.nickname : this.$store.state.memberInfo.userInfo.name
            },
            giftDivide() {
                return Math.ceil((this.$store.state.memberInfo.userInfo.gift/200)).toLocaleString()
            }
        },
        mounted() {
            this.getStatus()
        }
    }
</script>