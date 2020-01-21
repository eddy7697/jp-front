<template>
    <div class="personalTable">
        <div class="content container">
            <div class="row">
                <div class="col-12">
                    <div class="name">
                        {{this.$root.$options['languageSet']['NICKNAME']}}: {{nickname}}
                        <div class="pull-right" @click="redirect('editUserForm', {'content': nickname, 'title': 'nickname'})">
                            {{this.$root.$options['languageSet']['EDIT']}}
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        {{this.$root.$options['languageSet']['ACCOUNT']}}: {{account}}
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        {{this.$root.$options['languageSet']['MOBILE']}}: {{mobile}}
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        LINE ID: {{LINE}}
                        <div class="pull-right" @click="redirect('editUserForm', {'content': LINE, 'title': 'line_id'})">
                            {{this.$root.$options['languageSet']['EDIT']}}
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        <div class="float-left" style="width: 70%;">email: {{email}}</div>
                        <div class="pull-right float-right" @click="redirect('editUserForm', {'content': email, 'title': 'email'})">
                            {{this.$root.$options['languageSet']['EDIT']}}
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        {{this.$root.$options['languageSet']['GENDER']}}: {{gender}}
                        <div class="pull-right" @click="redirect('editUserForm', {'content': gender, 'title': 'gender'})">
                            {{this.$root.$options['languageSet']['EDIT']}}
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        {{this.$root.$options['languageSet']['BIRTHDAY']}}: {{birthday}}
                        <div class="pull-right" @click="redirect('editUserForm', {'content': birthday, 'title': 'birthday'})">
                            {{this.$root.$options['languageSet']['EDIT']}}
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="name">
                        {{this.$root.$options['languageSet']['REALNAME']}}: {{name}}
                        <div class="pull-right" @click="redirect('editUserForm', {'content': name, 'title': 'name'})">
                            {{this.$root.$options['languageSet']['EDIT']}}
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        {{this.$root.$options['languageSet']['PASSWORD']}}: ********
                        <input hidden type="password" v-model="password" disabled>
                        <div class="pull-right" @click="redirect('editUserForm', {'content': password, 'title': 'password'})">
                            {{this.$root.$options['languageSet']['EDIT']}}
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        {{this.$root.$options['languageSet']['INVITOR']}}: {{invitePerson}} <br/>
                        <span v-if="invitePersonLine">{{this.$root.$options['languageSet']['INVITOR']}}Line ID: {{invitePersonLine}}</span>
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        {{this.$root.$options['languageSet']['CARDDIF']}}: 
                        <span class="level_txt" v-if="!benefit">    </span>
                        <span class="level_txt" v-if="benefit == 3">    </span>
                        <span class="level_txt" v-if="benefit == 6">    </span>
                        <span class="level_txt" v-if="benefit == 9">    </span>
                        <span v-if="effective">({{this.$root.$options['languageSet']['DUEDAY']}}：{{effective}})</span> 
                    </div>
                </div>
                <div class="col-12">
                    <div  class="name">
                        {{this.$root.$options['languageSet']['PLAYERTITLE']}}: 
                        <img class="avatar" :src="levelIcon" alt="">
                        <div class="pull-right" @click="redirect('levelInfo')">
                            {{this.$root.$options['languageSet']['TITLEDESC']}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'personalTable', 
        data() {
            return {
                benefit: '',
                effective: ''
            }
        },
        props: {
            level: 0
        },
        components: {

        },
        methods: {
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
                
            },
            redirect(url, insertData) {
                if(insertData) {
                    this.$store.dispatch('changeEditForm', insertData)
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
                        this.$store.dispatch('updateMember', data)
                    }
                })    
            },
        },
        computed:  {
            levelIcon () {
                return require(`@/assets/images/level-icon/level_${this.level}.png`)
            },
            nickname() {
                return this.$store.state.memberInfo.userInfo.nickname
            },
            name() {
                return this.$store.state.memberInfo.userInfo.name
            },
            LINE() {
                return this.$store.state.memberInfo.userInfo.line_id
            },
            Wechat() {
                return this.$store.state.memberInfo.userInfo.wechat_id
            },
            account() {
                return this.$store.state.memberInfo.userInfo.account_name
            },
            password() {
                return this.$store.state.userState.password
            },
            mobile() {
                return this.$store.state.memberInfo.userInfo.phone
            },
            birthday() {
                return this.$store.state.memberInfo.userInfo.birthday
            },
            invitePersonLine() {
                return this.$store.state.memberInfo.userInfo.recommender_line_id
            },

            invitePerson() {
                return this.$store.state.memberInfo.userInfo.recommender_account_name
            },
            gender() {
                let result = this.$store.state.memberInfo.userInfo.gender
                if(result == 'male') {
                    return '男'
                } else {
                    return '女'
                }
            },
            email() {
                return this.$store.state.memberInfo.userInfo.email
            },
        },
        mounted() {
            this.api()
            this.getBuff()
            console.log(this.$store.state.memberInfo.userInfo)

        }
    }
    

</script>