<template>
    <div class="naviBarMobile" :style="styleObj">
        <naviBarIcons />
        <div class="mobileNav" v-if="hideNav">
            <div class="user-area" @click="redirect('group')">
                <img class="level_icon" :src="returnLevelicon(level)" alt="">                
                <img v-if="!benefit" class="diamond_icon" src="@/assets/images/diamonds/transparent.png" alt="">
                <img v-if="benefit == 3" class="diamond_icon" src="@/assets/images/diamonds/transparent.png" alt="">
                <img v-if="benefit == 6" class="diamond_icon" src="@/assets/images/diamonds/transparent.png" alt="">
                <img v-if="benefit == 9" class="diamond_icon" src="@/assets/images/diamonds/transparent.png" alt="">
                <span class="level_txt" v-if="!benefit">    </span>
                <span class="level_txt" v-if="benefit == 3">    </span>
                <span class="level_txt" v-if="benefit == 6">    </span>
                <span class="level_txt" v-if="benefit == 9">    </span>
                <span class="name_txt">{{name}}</span>
                <img class="avatar_icon" src="@/assets/images/avatar/user_0.png" alt="">
            </div>
            <div class="coins-area">
                <span id="gold_coin">
                    <div class="number">{{gold}}</div>
                </span>
                <span id="entertain_coin">
                    <div class="number">{{ucoin}}</div>
                </span>
                <span id="bonus_coin">
                    <div class="number">{{bonus}}</div>
                </span>
                <span id="gift_coin">
                    <div class="number">{{gift}}</div>
                </span>
            </div>
        </div> 
    </div>
</template>
<script>
    import naviBarIcons from '@/components/naviBar/ui/naviBarIcons'
    export default {
        name: 'naviBarMobile',
        components: {
            naviBarIcons
        },
        data() {
            return {
                benefit: 0,
                effective: '',
                items: '',
                uid: '',
                level: 0,
                tohideNavMobile: true,
                styleObj: {}
            }
        },
        props: {
        },
        computed: {
            bonus() {
              return Number(this.$store.state.memberInfo.userInfo.bonus).toLocaleString()
            },
            gold() {
                return Number(this.$store.state.memberInfo.userInfo.gold).toLocaleString()
            },
            gift() {
                return Number(this.$store.state.memberInfo.userInfo.gift).toLocaleString()
            }, 
            ucoin() {
                return Number(this.$store.state.memberInfo.userInfo.ucoin).toLocaleString()
            },
            name() {
                return this.$store.state.memberInfo.userInfo.nickname ? this.$store.state.memberInfo.userInfo.nickname : this.$store.state.memberInfo.userInfo.name
            },
            hideNav() {
                if(
                    this.$route.name == 'mainPage' ||
                    this.$route.name == 'contractShop'
                ) {
                    this.styleObj = {'height': '60px'}
                    return false
                }
                this.styleObj = ''
                return true
            }
        },
        methods: {
            returnLevelicon(level) {
                return require(`@/assets/images/level-icon/level_${level}.png`)
            },
            returnLevelTxt(levelIcon) {
                switch(levelIcon) {
                        case 0:
                            return '會員'
                        break;
                        case 1:
                            return '新秀'
                        break;
                        case 2:
                            return '菁英'
                        break;
                        case 3:
                            return '好手'
                        break;
                        case 4:
                            return '高手'
                        break;
                        case 5:
                            return '專家'
                        break;
                        case 6:
                            return '名家'
                        break;
                        case 7:
                            return '達人'
                        break;
                        case 8:
                            return '名人'
                        break;
                        case 9:
                            return '大師'
                        case 10:
                            return '宗師'
                        break;
                        default:
                }
            },
            redirect(url) {
                this.$store.dispatch('toggleNav', false)
                this.$router.push(url)
            },
            api() {
                let data = {}
                data['url'] = this.$root.$options.api['api3']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                let res = this.$store.dispatch('getApi', data) 
                res.then((val)=>{
                    if (val['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                        var data = val['data']
                        this.level = val['data']['level']
                    }
                })    
            },
            getBuff() {
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
                        if(this.items){
                            this.items.forEach((item)=>{
                                if(item['code']== 'vip_buff'){
                                    this.benefit = item['config']['benefit']
                                    this.effective = item['config']['effective']
                                }
                            })
                        }
                    }
                })
                
            }
        },
        mounted() { 
            this.api()
            this.getBuff()
        }
    }
</script>