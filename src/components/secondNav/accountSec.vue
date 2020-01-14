<template>
    <div class="accountSec">
        <buff />
        <buffQrCode v-if="buffQrCode"/>
        <div class="container">
            <div class="row">  
                <div class="accountNav">
                    <div :class="{active: detect == '1'}"
                    @click="()=>{clickNav('1', 'personal')}">{{txT['SELFPERSONAL']}}</div>
                    <div 
                    :class="{active: detect == '2'}"
                    @click="()=>{clickNav('2', 'accountPage')}">{{txT['ACCOUNTTIT']}}</div>
                    <div
                    :class="{active: detect == '3'}"
                    @click="()=>{clickNav('3', 'friends')}"
                    >{{txT['FRIENDS']}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import buff from '@/components/buff/buff'
    import buffQrCode from '@/components/buff/buffQrCode'
    export default {
        name: 'accountSec',
        components: {
            buff,
            buffQrCode
        },
        props: {

        },
        data() {
            return {
                isActive: '2'
            }
        },
        methods: {
            clickNav(nu) {
                // this.isActive = nu;
                this.$store.dispatch('accountNavChange', nu)
            }
        },
        computed: {
            detect() {
                return this.isActive = this.$store.state.accountNav.accountNavPosition
            },
            buffQrCode() {
                return this.$store.state.modalControlOne.buffQrCode
            },
            buff() {
                console.log(this.$store.state.buff['data'])
            },
            txT(){
                return this.$root.$options['languageSet']
            }
        },
        mounted() {
            this.buff
            // this.clickNav('2')
            // if(this.$route.name == 'group')
            // this.clickNav('3')
        }
    }
</script>
