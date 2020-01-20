<template>
    <div class="accountInfoPanelMobile">
        <div class="container">
            <div class="row">
                <div class="personInfo">
                    <span class="col-6 float-left text-left">{{name}}</span>
                    <span class="col-6 float-right text-right">ID: {{uid}}</span>
                </div>
                <div class="mobile-panel">
                    <img :src="showPanel(level)" alt="">
                    <img  class="avatar" src="~@/assets/images/avatar/user_0.png" alt="">

                    <!-- <img @click="showAvatarSel()" class="avatar" src="~@/assets/images/avatar/user_27.png" alt=""> -->
                </div>

                <div class="level-class-info">
                    <div>
                        <span>{{txT['CLASSBADGE']}}</span>
                        <img @click="redirect('levelInfo')" class="info-icon" src="~@/assets/images/accountPanel/icon-info.png" alt="">
                    </div>
                    <div>
                        <img class="level_web_icon" :src="levelIcon" alt="">
                        <span class="member-txt">{{returnLevelTxt(level)}}</span>
                        <button class="gift-report" @click="report()">{{txT['GIFTREPORT']}}</button>
                    </div>
                </div>
                <div class="card-class-info">
                    <img v-if="!benefit" class="diamond_icon" src="@/assets/images/diamonds/transparent.png" alt="">
                    <img v-if="benefit == 3" class="diamond_icon" src="@/assets/images/diamonds/transparent.png" alt="">
                    <img v-if="benefit == 6" class="diamond_icon" src="@/assets/images/diamonds/transparent.png" alt="">
                    <img v-if="benefit == 9" class="diamond_icon" src="@/assets/images/diamonds/transparent.png" alt="">

                    <span class="level_txt" v-if="!benefit">    </span>
                    <span class="level_txt" v-if="benefit == 3">    </span>
                    <span class="level_txt" v-if="benefit == 6">    </span>
                    <span class="level_txt" v-if="benefit == 9">    </span>
                    <img class="icon-plus" @click="redirect('/mall')" src="~@/assets/images/accountPanel/icon-plus.png" alt="">
                    <span class="expire_time" v-if="effective">({{txT['DUEDAY']}} : {{effective}})</span>
                </div>
            </div>
            <a id="pdfRe" target="_blank" href="" style="display:none;"></a>
        </div>
    </div>
</template>
<script>
    import redirect from './../../../redirect'

    export default {
        name: 'accountInfoPanelMobile',
        props: {
            name: '',
            uid: ''
        },
        data() {
            return {
                level: 0,
                benefit: '',
                effective: '',
                page: 1,
                informationCard: false
            }
        },
        computed: {
            levelIcon () {
                return require(`@/assets/images/level-icon/level_${this.level}.png`)
            },
            txT(){
                return this.$root.$options['languageSet']
            }
        },
        methods: {
            openNewWin(url) {
                var windowReference = window.open()
                windowReference.location = url
            },
            detect() {
                var ua = navigator.userAgent.toLowerCase(); 
                if (ua.indexOf('safari') != -1) { 
                    if (ua.indexOf('chrome') > -1) {
                        return false// Chrome
                    } else {
                        return true// Safari
                    }
                }
            },
            report() {
                let year = new Date().getFullYear()
                var month = new Date().getMonth()+1
                if(this.interval == 'lastMonth'){
                    month = new Date().getMonth()
                } 
                let data = {}
                data['url'] = `${this.$root.$options.api['api2']}?year=${year}&month=${month}&page=${this.page}&rows=15`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        if(item['data'].length == 0 || this.informationCard){
                            redirect.redirect('/#/mall', '提醒', '請到商城購買後使用資訊卡', 'warning', true)
                        } else {
                            if(!this.detect()) {
                                this.openNewWin(item['data']['0']['file'])
                            } else {
                                window.location = item['data']['0']['file']
                            }
                        }
                    }
                })
            },
            redirect(url) {
                this.$router.push(url)
            },
            showAvatarSel() {
               this.$store.dispatch('avatarModal', true)
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
                        console.log(this.items)
                        if(this.items){
                            this.items.forEach((item)=>{
                                if(item['code'] == 'vip_buff'){
                                    this.benefit = item['config']['benefit']
                                    this.effective = item['config']['effective']
                                }
                                if(item['code'] == 'item_bale'){
                                    this.informationCard = true
                                }
                            })
                        }
                    }
                })
                
            },
            showPanel(level) {
                switch(level) {
                    case 0:
                        return require('@/assets/images/panel/mobile/panel_phone_0.png')
                    break;
                    case 1:
                        return require('@/assets/images/panel/mobile/panel_phone_1.png')
                    break;
                    case 2:
                        return require('@/assets/images/panel/mobile/panel_phone_2.png')
                    break;
                    case 3:
                        return require('@/assets/images/panel/mobile/panel_phone_3.png')
                    break;
                    case 4:
                        return require('@/assets/images/panel/mobile/panel_phone_4.png')
                    break;
                    case 5:
                        return require('@/assets/images/panel/mobile/panel_phone_5.png')
                    break;
                    case 6:
                        return require('@/assets/images/panel/mobile/panel_phone_6.png')
                    break;
                    case 7:
                        return require('@/assets/images/panel/mobile/panel_phone_7.png')
                    break;
                    case 8:
                        return require('@/assets/images/panel/mobile/panel_phone_8.png')
                    break;
                    case 9:
                        return require('@/assets/images/panel/mobile/panel_phone_9.png')
                    case 10:
                        return require('@/assets/images/panel/mobile/panel_phone_10.png')
                    break;
                    default:
                }
                
            }
        },
        components: {
        },
        mounted() {
            this.getBuff()
            this.api()
        }
    }
</script>