<template>
    <div class="Footer">

        <div @click="redirect('mainPage')">
            <img :src="mainPage" alt="">
            {{txT['HOMEPAGE']}}
        </div>
        <!-- <div>
            <img :src="contractShop" alt="" @click="redirect('contractShop')">
            特約商店
        </div> -->
        <!-- <div @click="redirect('/System')">
            <img :src="game" alt="">
            {{txT['GAME']}}
        </div> -->
        <!-- <div>
            <img :src="trade" alt="" @click="redirect('Trade')">
            回饋幣
        </div> -->
        <!-- <div @click="redirect('Mall')">
            <img :src="tools" alt="">
            {{txT['TOOL']}}
        </div> -->
        <div @click="redirect('Group')">
            <img :src="group" alt="">
            {{txT['ACCOUNT']}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Footer',
        methods: {
            redirect(url) {
                if(url == 'contractShop') {
                    this.$store.dispatch('subNavNu', 1)
                }
                this.$router.replace(url)
                this.$store.dispatch('toggleNav', false)
                window.scrollTo(0, 0)
            }
        },
        computed: {
            txT(){
                return this.$root.$options['languageSet']
            },
            contractShop() {
                let pic = 'icon_shop.png'
                if (this.$route.name == 'contractShop')
                pic = 'icon_shop_h.png'
                return require(`@/assets/images/footer/${pic}`)
            },
            trade() {
                let pic = 'icon_transaction.png'
                if (this.$route.name == 'trade')
                pic = 'icon_transaction.png'
                return require(`@/assets/images/footer/${pic}`)
            },
            tools() {
                let pic = 'icon_mall.png'
                if (this.$route.name == 'mall')
                pic = 'icon_mall_h.png'
                return require(`@/assets/images/footer/${pic}`)
            },
            game() {
                let pic = 'icon_game.png'
                if (this.$route.name == 'System')
                pic = 'icon_game_h.png'
                return require(`@/assets/images/footer/${pic}`)
            },
            group() {
                let pic = 'icon_user.png'
                if (this.$route.name == 'group')
                pic = 'icon_user_h.png'
                return require(`@/assets/images/footer/${pic}`)
            },
            mainPage() {
                let pic = 'icon_home.png'
                if (this.$route.name == 'mainPage')
                pic = 'icon_home_h.png'
                return require(`@/assets/images/footer/${pic}`)
            }

        }
    }
</script>