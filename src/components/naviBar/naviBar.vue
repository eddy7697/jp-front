<template>
    <div class="NaviBar">
        <NaviBarPc></NaviBarPc>
        <naviBarMobile></naviBarMobile>
    </div>
</template>
<script>
    import NaviBarPc from '@/components/naviBar/naviBarPc'
    import naviBarMobile from '@/components/naviBar/naviBarMobile'
    export default {
        name: 'NaviBar',
        data() {
            return  {
            }
        },
        components: {
            NaviBarPc,
            naviBarMobile
        },
        props: {
        },
        methods: {
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
                        this.$store.dispatch('updateMember', data)
                        this.getLevel()
                        if(!val['data']['phone'] || !val['data']['sms_verified_at']) {
                            this.$route.push('contractShop')
                            return
                        }
                        // if(!val['data']['phone'] || !val['data']['sms_verified_at']) {
                        //     this.$route.push('/registrationRules')
                        //     return
                        // }
                    }
                })    
            },
            getLevel() {
                let data = {}
                data['url'] = this.$root.$options.api['api4']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        this.$store.dispatch('updateBuff', item)
                    }
                })
            }
        },
        data() {
            return {
            }
        },
        mounted() {
            this.api()
            // setInterval(()=>{
            //     this.api()
            // }, 60000*5)
        }
    }
</script>