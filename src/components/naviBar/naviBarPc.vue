<template>
    <div class="NaviBar-Pc">
        <div id="pc-nav-content" class="row">
            <!-- <div class="row">
                <div class="logo" @click="checkRoute()">
                    <img class="img-responsive" src="@/assets/images/logo.png" alt="">
                </div>
                <div class="right-nav pull-right">
                    <span class="nav-round-icon" @click="redirect('/receivePage')">
                        <img class="img-responsive" src="@/assets/images/pc-navibar-icons/checking_web_icon.png" alt="">
                        <span>信件夾</span>
                    </span>
                    <span class="nav-round-icon" @click="redirect('/Newest')">
                        <img class="img-responsive" src="@/assets/images/pc-navibar-icons/icon_web_news.png" alt="">
                        <span>消息</span>
                    </span>
                    <span class="nav-round-icon" @click="customServce()">
                        <img class="img-responsive" src="@/assets/images/pc-navibar-icons/csr_web_icon.png" alt="">
                        <span>客服</span>
                    </span>
                    <span v-if="false" class="nav-round-icon" @click="checkRoute()">
                        <img class="img-responsive" v-if="!mapRoute" src="@/assets/images/pc-navibar-icons/system_icon_web.png" alt="">
                        <img class="img-responsive" v-if="mapRoute" src="@/assets/images/pc-navibar-icons/map_web_icon.png" alt="">
                        <span>{{textRoute}}</span>
                    </span>
                    <span class="nav-round-icon" @click="redirect('Deposit')">
                        <img class="img-responsive" src="@/assets/images/pc-navibar-icons/saving_web_icon.png" alt="">
                        <span>儲值</span>
                    </span>
                    <span class="nav-round-icon" @click="logout()">
                        <img class="img-responsive" src="@/assets/images/pc-navibar-icons/logout_web_icon.png" alt="">
                        <span>{{this.$root.$options['languageSet']['LOGOUT']}}</span>
                    </span>
                </div>
            </div> -->
            <div class="row">
                <naviBarIcons />
            </div>
            <div class="row">
                <div id="avatar_space"> 
                    <div id="userStatus" @click="redirect('Group')">
                        <img class="level_web_icon" :src="returnLevelicon(level)" alt="">
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
                </div>
                <div id="sideNav">
                    <div id="firstSideNav" class="row">
                        <span :class="{'active': this.$store.state.navibar.activeMain}" @click="redirect('mainPage')">{{txT['HOMEPAGE']}}</span>
                        <!-- <span :class="{'active': this.$store.state.navibar.activeShopping}" @click="redirect('contractShop')">特約商店</span> -->
                        <!-- <span :class="{'active': this.$store.state.navibar.activeTrade}" @click="redirect('System')">{{txT['GAME']}}</span> -->
                        <!-- <span :class="{'active': this.$store.state.navibar.activeGame}" @click="redirect('Trade')">回饋幣</span> -->
                        <!-- <span :class="{'active': this.$store.state.navibar.activeGroup}" @click="redirect('Mall')">{{txT['TOOL']}}</span> -->
                        <span :class="{'active': this.$store.state.navibar.activeAccount}" @click="redirect('Account')">{{txT['ACCOUNT']}}</span>
                    </div>
                    <div id="secondSideNav" class="row">
                        <span id="gold_coin">
                            <span class="number">{{gold}}</span>
                        </span>
                        <span id="entertain_coin">
                            <span class="number">{{ucoin}}</span>
                        </span>
                        <span id="bonus_coin">
                            <span class="number">{{bonus}}</span>
                        </span>
                        <span id="gift_coin">
                            <span class="number">{{gift}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import redirect from './../../redirect'
    import naviBarIcons from '@/components/naviBar/ui/naviBarIcons'
    export default {
      name: 'naviBarPc',
      props: {
      },
      components: {
          naviBarIcons
      },
      data() {
        return {
           textRoute: '地圖版',
           mapRoute: true,
           benefit: 0,
            effective: '',
            items: '',
            uid: '',
            level: 0,
        }
      },
      computed: {
          txT(){
            return this.$root.$options['languageSet']
          },
          name() {
                return this.$store.state.memberInfo.userInfo.nickname ? this.$store.state.memberInfo.userInfo.nickname : this.$store.state.memberInfo.userInfo.name
            },
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
      },
      methods: {
        logout() {
            let data = {}
            data['url'] = this.$root.$options.api['api24']
            this.$store.dispatch('delApi', data).then((result)=>{
                if (result['result'] == 'error') {
                    console.log('2341234123', result)
                    this.$store.dispatch('openAlert', result)
                } else {
                    // let set = {};
                    // set['text'] = '您已成功登出'
                    // set['title'] = '成功'
                    // set['url'] = ''
                    // set['reload'] = true
                    // this.$store.dispatch('redirectConfirm', set)
                    localStorage.clear();

                    redirect.redirect('/', '成功', this.$root.$options['languageSet']['SUCCESSLOGOUT'], 'success')
                }
            })
        },
        ...mapActions('navibar', [
            'updatedLink',
        ]),
        returnLevelicon(level) {
            return require(`@/assets/images/level-icon/level_${level}.png`)
        },
        receivePage() {
            
        },
        contractShopCS(){
            window.open('https://line.me/R/ti/p/%40534ryvzc#~')
        },
        customServce() {
            window.open('https://line.me/R/ti/p/%40534ryvzc#~')
        },
        checkRoute() {
            // var urlToGo = 'map'
            // if(this.$route.name == 'map') {
            //     this.textRoute = '系統版'
            //     this.mapRoute = false
            //     urlToGo = 'system'
            // }
            // this.textRoute = '地圖版'
            // this.mapRoute = true
            // this.redirect(urlToGo)
            this.redirect('mainPage')
        },
        redirect(url) {
            var data = {
                activeMain: false,
                activeShopping: false,
                activeTrade: false,
                activeGame: false,
                activeGroup: false,
                activeAccount: false,
            }
            switch(url){
                case 'trade':
                    data['activeGame'] = true;
                    this.$store.dispatch('updatedLink', data)
                break;
                case 'System':
                    data['activeTrade'] = true;
                    this.$store.dispatch('updatedLink', data)
                break;
                case 'Mall':
                    data['activeGroup'] = true;
                    this.$store.dispatch('updatedLink', data)
                break;
                case 'Account':
                    data['activeAccount'] = true;
                    this.$store.dispatch('updatedLink', data)
                break;
                case 'Group':
                    data['activeGroup'] = true;
                    this.$store.dispatch('updatedLink', data)
                break;
                case 'mainPage':
                    data['activeMain'] = true;
                    this.textRoute = '系統版'
                    this.mapRoute = false
                    this.$store.dispatch('updatedLink', data)
                break;
                case 'contractShop':
                    data['activeShopping'] = true;
                    this.textRoute = '地圖版'
                    this.mapRoute = true
                    this.$store.dispatch('updatedLink', data)
                break;
                default:
            }
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
          this.redirect(this.$route.name);     
          this.api()
          this.getBuff() 
      }  
    }
</script>