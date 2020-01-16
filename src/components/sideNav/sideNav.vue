<template>
    <div class="sideNav">
        <ul>
            <li>
                <div @click="redirect('newest')">
                    <img src="~@/assets/images/sideNav/icon_news.png" alt="">
                    {{txT['NEWS']}}
                </div>
            </li>

            <!-- <li>
                <div @click="redirect('Deposit')">
                    <img src="~@/assets/images/sideNav/icon_money.png" alt="">
                    遊戲儲值
                </div>
            </li> -->

            <li>
                <div @click="customServce()">
                    <img src="~@/assets/images/sideNav/icon_service.png" alt="">
                    {{this.$root.$options['languageSet']['CUSTOMSERVICE']}}
                </div>
            </li>
            <!-- <li>
                <div @click="fbServce()">
                    <img src="~@/assets/images/sideNav/icon-fb.png" alt="">
                    官方臉書
                </div>
            </li> -->
            <!-- <li>
                <div @click="contractShopCS()">
                    <img src="~@/assets/images/sideNav/icon_shop_white.png" alt="">
                    特約商店客服
                </div>
            </li>
            <li>
                <div>
                    <img src="~@/assets/images/sideNav/icon_book.png" alt="">
                    <a href="http://www.ucoin.com.tw/assets/introduction.pdf" target="_blank">
                    平台使用說明
                    </a>
                </div>
            </li>
            <li>
                <div>
                    <img src="~@/assets/images/sideNav/icon_help.png" alt="">
                    <a href="http://www.ucoin.com.tw/assets/shop_user.pdf" target="_blank">
                    消費折抵說明
                    </a>
                </div>
            </li> -->
            <li>
                <div @click="logout()">
                    <img src="~@/assets/images/sideNav/icon_logout.png" alt="">
                    {{this.$root.$options['languageSet']['LOGOUT']}}
                </div>
            </li>
            <li>
                <div></div>
            </li>
            <li>
                <div></div>
            </li>
        </ul>
    </div>
</template>
<script>
    import redirect from './../../redirect'
    
    export default {
        name: 'sideNav',
        methods: {
            redirect(url) {
                this.$store.dispatch('toggleNav', false)
                this.$router.push(url)
            },
            fbServce() {
                window.open('https://www.facebook.com/ucoin168/')
            },
            customServce() {
                window.open('https://line.me/R/ti/p/%40534ryvzc#~')
            },
            contractShopCS(){
                window.open('https://line.me/R/ti/p/%40534ryvzc#~')
            },
            logout() {
                let data = {}
                data['url'] = this.$root.$options.api['api24']
                this.$store.dispatch('delApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        console.log('2341234123', result)
                        this.$store.dispatch('openAlert', result)
                    } else {
                        localStorage.clear();
                        redirect.redirect('/', '成功', this.$root.$options['languageSet']['SUCCESSLOGOUT'], 'success')
                    }
                })
            }
        },
        computed: {
            txT(){
                return this.$root.$options['languageSet']
            }
        },
        mounted() {
        }
    }
</script>