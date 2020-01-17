<template>
    <div class="lottery">
        <div class="content" >
            <div class="moneyFly">
                <img style="cursor:pointer;" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
                <img class="fallImg" v-show="showFallMoney" src="~@/assets/images/lottery/moneyfall.gif" alt="">
                    <div class="container p-0">
                        <div class="row justify-content-center text-center">
                            <div class="col-12">
                                <h4 class="text-center">{{txT['ALREADYSIGNIN']}}<b>{{day}}</b>{{txT['DAY']}}</h4>
                            </div>
                            <div v-for="(item, index) in count" class="col-3 p-0 text-center" @click="showFall()">
                                <h6>第{{index == 0 ? 1 : index+1}}{{txT['DAY']}}</h6>
                                <img v-if="index < count-1 && !checked" class="img-responsive" src="~@/assets/images/lottery/sign-normal-done.png" alt="">
                                <img v-if="index+1 == count && index+1 < 7 && !checked" class="img-responsive" src="~@/assets/images/lottery/sign-normal-now.gif" alt="">
                                <img v-if="index < count-1 && checked" class="img-responsive" src="~@/assets/images/lottery/sign-normal-done.png" alt="">
                                <img v-if="index+1 == count && checked && index+1 < 7" class="img-responsive" src="~@/assets/images/lottery/sign-normal-done.png" alt="">
                                <img v-if="index+1 == 7 && !checked" class="img-responsive" src="~@/assets/images/lottery/sign-final-now.gif" alt="">
                                <img v-if="index+1 == 7 && checked" class="img-responsive" src="~@/assets/images/lottery/sign-final-done.png" alt="">
                                <p class="text-danger text-center" v-if="index < 6">+8800</p>
                                <p class="text-danger text-center" v-if="index+1 == 7">+16800</p>
                            </div>
                            <div v-for="(item, index) in 7" class="col-3 p-0 text-center" v-if="item > count">
                                <h6>第{{index == 0 ? 1 : index+1}}{{txT['DAY']}}</h6>
                                <!-- <img v-if="index < uncount-1 && !checked" class="img-responsive" src="~@/assets/images/lottery/sign-normal-done.png" alt=""> -->
                                <!-- <img v-if="index+1 == uncount && index+1 < 7 && !checked" class="img-responsive" src="~@/assets/images/lottery/sign-normal-now.png" alt=""> -->
                                <!-- <img v-if="index < " class="img-responsive" src="~@/assets/images/lottery/sign-normal-done.png" alt=""> -->
                                <img v-if="index+1 < 7" class="img-responsive" src="~@/assets/images/lottery/sign-normal-undone.png" alt="">
                                <img v-if="index+1 == 7" class="img-responsive" src="~@/assets/images/lottery/sign-final-undone.png" alt="">
                                <!-- <img v-if="index+1 == 7 && checked" class="img-responsive" src="~@/assets/images/lottery/sign-final-done.png" alt=""> -->
                                <p class="text-danger text-center" v-if="index < 6">+8800</p>
                                <p class="text-danger text-center" v-if="index+1 == 7">+16800</p>
                            </div>
                            
                            <div class="col-12 text-center">
                                <h4>{{txT['REMEMBERSIGN']}}</h4>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <audio id="myAudio">
            <source src="~@/assets/images/lottery/money.mp3" type="audio/mp3">
        </audio>
    </div>
</template>
<script>
import redirect from './../../../redirect'
import { setTimeout } from 'timers';
export default {
    name: 'lottery',
    props: {
        count: 0
    },
    data() {
        return {
            showFallMoney: false,
            checked: false,
            day: 0
        }
    },
    methods:{
        showFall() {
            if(this.count < 7){
                this.day++
            }
            this.checked = true
            this.showFallMoney = !this.showFallMoney
            var audio = document.getElementById("myAudio")
            audio.play() 
            this.sign()
        },
        sign(item){
            let data = {};
            data['url'] = this.$root.$options.api['api49']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity_token'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((result)=>{
                if (result['result'] == 'error') {
                    console.log(result)
                    this.$store.dispatch('openAlert', result)
                } else {
                    if(result['result'] == 'success') {
                        setTimeout(()=>{
                            redirect.redirect('/#/mainPage', '成功', this.$root.$options['languageSet']['YOURALREADISUCCESS'], 'success', true)
                        }, 2500)
                    }
                }
            })
        },
        closeModal (){
            this.$store.dispatch('lotteryModal', false)
        },
        countDays() {
            this.day = this.count == 1 ? 0 : this.count-1
        }
    },
    computed:{
        txT(){
            return this.$root.$options['languageSet']
        }
    },
    mounted() {
        this.countDays()
    }
}
</script>
