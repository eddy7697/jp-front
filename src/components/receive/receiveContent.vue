<template>
    <div class="receiveContent">
        <receiveSec/>
        <div class="container">
            <div class="row">                
                <div class="col-12" v-if="cycle.length !== 0">
                    <div class="card" v-for="(item, index) in cycle" :key="index">
                        <div>
                            <img v-if="item['features'][0]['code'] == 'daily_reward_bonus'" src="@/assets/images/receive/mail-icon-sign.png" alt="">
                        </div>
                        <div>
                            <h6>{{item['name']}}</h6>
                            <p>{{item['description']}}</p>
                            <p v-if="item['expires_at']">{{item['expires_at']}}</p>
                        </div>
                            <div>
                            <button class="btn btn-danger" @click="receiveEnv(item)">{{this.$root.$options['languageSet']['RECEIVETXT']}}
</button>
                        </div>
                    </div>
                </div>
                <div class="col-12" v-if="general.length !== 0">
                    <div class="card" v-for="(item, index) in general" :key="index">
                        <div v-if="item['features'].length !== 0">
                            <img v-if="item['features'][0]['code'] == 'profile_reward_gift'" src="@/assets/images/receive/mail-icon-gift.png" alt="">
                            <img v-if="item['features'][0]['code'] == 'item_bale'" src="@/assets/images/receive/mail-icon-mail.png" alt="">
                        </div>
                        <div>
                            <h6>{{item['name']}}</h6>
                            <p v-html="item['description']"></p>
                            <p v-if="item['expires_at']">{{item['expires_at']}}</p>
                        </div>
                        <div>
                            <button class="btn btn-success" @click="receiveEnv(item)">{{this.$root.$options['languageSet']['RECEIVETXT']}}
</button>
                        </div>
                    </div>
                </div>
                <div class="col-12" v-if="individual.length !== 0">
                    <div class="card" v-for="(item, index) in individual" :key="index">
                        <div v-if="item['features'].length !== 0">
                            <img v-if="item['features'][0]['code'] == 'treasure_add_gold'" src="@/assets/images/receive/mail-icon-game.png?v=1" alt="">
                            <img v-if="item['features'][0]['code'] == 'feedback_month_gift'" src="@/assets/images/receive/mail-icon-gift.png?v=1" alt="">
                            <img v-if="item['features'][0]['code'] == 'feedback_add_gift'" src="@/assets/images/receive/mail-icon-lot.png?v=1" alt="">
                            <img v-if="item['features'][0]['code'] == 'add_gift'" src="@/assets/images/receive/mail-icon-feedback.png" alt="">
                            <img v-if="item['features'][0]['code'] == 'recommend_add_gift'" src="@/assets/images/receive/mail-icon-feedback.png" alt="">
                            <img v-if="item['name'].includes('990')" src="@/assets/images/receive/gift-box.png" alt="">
                        </div>
                        <div v-if="item['features'].length == 0">
                             <img  src="@/assets/images/receive/mail-icon-mail.png" alt="">
                        </div>
                        <div>
                            <h6>{{item['name']}}</h6>
                            <p v-html="item['description']"></p>
                            <p v-if="item['expires_at']">{{item['expires_at']}}</p>
                        </div>
                        <div v-if="item['features'].length == 0">
                            <button class="btn btn-success" @click="receiveEnv(item)">確認</button>
                        </div>
                        <div v-if="item['features'].length !== 0">
                            <button class="btn btn-success" @click="receiveEnv(item)">{{this.$root.$options['languageSet']['RECEIVETXT']}}
</button>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    </div>
</template>

<script>
    import receiveSec from '@/components/secondNav/receiveSec'
    import redirect from './../../redirect'

    export default {
        name: 'receiveContent',
        data(){
            return {
                general: '',
                cycle: '',
                individual: ''
            }
        },
        components: {
            receiveSec,
        },
        methods: {
            test() {
            },
            putApi(item) {
                let data = {};
                data['url'] = `${this.$root.$options.api['api42']}/${item.type}/${item.id}/receive`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        if(result['errorMsg'].error.message.indexOf('請至(帳戶->個人)填寫完整資料。') == 0) {
                            // this.$router.push('editUserForm')
                            redirect.redirect('/#/editUserForm', '請去完成任務', result['errorMsg'].error.message, 'warning')
                            return
                        }
                        this.$store.dispatch('openAlert', result)
                        this.getInbox()
                    } else {
                        let set = {};
                        set['text'] = this.$root.$options['languageSet']['ALREADIRECIVED']
                        set['title'] = '完成'
                        set['url'] = '/receivePage'
                        set['reload'] = true
                        if(result['data']['features'].length !== 0) {
                            result['data']['features'].forEach((item)=>{
                                if(item['code'] == 'feedback_add_gift') {
                                    if(item['handle']['fake'].length !== 0) {
                                        set['title'] = '恭喜您'
                                        set['text'] = '下一步請抽取禮包'
                                        this.$store.dispatch('enveModal', {show: true, content: item['handle']})
                                        return
                                    } else {
                                        console.log('1')
                                        redirect.redirect('/#/receivePage', '完成', this.$root.$options['languageSet']['ALREADIRECIVED'], 'success', true)
                                    }
                                } else {
                                    console.log('2')
                                    redirect.redirect('/#/receivePage', '完成', this.$root.$options['languageSet']['ALREADIRECIVED'], 'success', true)
                                }
                            })
                        } else {
                            console.log('3')
                            redirect.redirect('/#/receivePage', '完成', this.$root.$options['languageSet']['ALREADIRECIVED'], 'success', true)
                        }
                    }
                })
            },
            receiveEnv(item) {
                console.log(item)
                this.putApi(item)
                // if (item['features'].length !== 0) {
                //     if(item['features'][0]['code'] == 'feedback_month_gift'){
                //         this.$store.dispatch('confirmSureReceive', {show: true, content: item })
                //         return
                //     } else {
                //         this.putApi(item)
                //     }
                // } else {
                //     this.putApi(item)
                // }
            },
            getInbox() {
                let data = {}
                data['url'] = this.$root.$options.api['api42']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', val)
                    } else {
                       this.general = item['data'][0]['general']
                       this.cycle = item['data'][0]['cycle']
                       this.individual = item['data'][0]['individual']
                       console.log(this.general)
                       console.log(this.cycle)
                       console.log(this.individual)
                    }
                })
            }
        },
        mounted() {
            this.getInbox()
        }
    }
</script>