<template>
    <div class="editForm">
        <div class="container">
            <div class="row">
                <div class="content">
                    <fieldset class="form-group col-12" v-if="changeInput == 'styleOne'">
                        <label for="formTitle">{{implyTitle}}*</label>
                        <input type="formTitle" v-model="valueInput" class="form-control" name="formTitle" id="formTitle" placeholder="">
                    </fieldset>
                    <fieldset class="form-group col-12" v-if="changeInput == 'styleTwo'">
                        <label for="formTitle">{{implyTitle}}*</label>
                        <div>
                            <input type="radio" name="gender" v-model="valueInput" value="male"> 男<br>
                            <input type="radio" name="gender" v-model="valueInput" value="female"> 女<br>
                        </div>
                    </fieldset>
                    <fieldset class="form-group col-12" v-if="changeInput == 'styleThree'">
                        <!-- <dropdown-datepicker v-bind:on-day-change="changeDate"></dropdown-datepicker> -->
                        <DateDropdown
                            months-names="1月, 2月, 3月, 4月, 5月, 6月, 7月, 8月, 9月, 10月, 11月, 12月"
                            min="1900"
                            max="2020"
                            default="01-01-2000"
                            v-model="valueInput"/>
                        <p class="text-danger">加入會員須年滿15歲*</p>
                        
                        <!-- <datepicker :language="zh" :format="customFormatter" v-model="valueInput"></datepicker> -->
                    </fieldset>
                    <fieldset class="form-group" v-if="changeInput == 'styleFour'">
                        <label for="formTitle">{{implyTitle}}*</label>
                        <input type="formTitle" v-model="valueInput" class="form-control" name="formTitle" id="formTitle" placeholder="新密碼">
                        <input type="formTitle" v-model="valueInputCP" class="form-control" name="formTitle" id="formTitle" placeholder="再次確認密碼">
                        <div class="input-group">
                            <input type="text" v-model="msgTxt" class="form-control" name="code" id="code" maxlength="20" required placeholder="簡訊驗證碼">
                            <div class="input-group-append">
                                <button class="btn btn-secondary btn-success" type="button" id="get_code" @click="getMsgTxt()">取得簡訊驗證碼</button>
                            </div>
                        </div>
                    </fieldset>
                    <button @click="redirect('Group')">{{this.$root.$options['languageSet']['CONFIRMTXT']}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import Datepicker from 'vuejs-datepicker'
    import {zh} from 'vuejs-datepicker/dist/locale'
    import DateDropdown from 'vue-date-dropdown'
    import redirect from './../../redirect'
    export default {
        name: 'editForm',
        props: {
            title: String,
            value: ''
        },
        data() {
            return {
                valueTitle: '',
                valueInput: '',
                changeInput: 'styleOne',
                zh: zh,
                currentDay: '',
                msgTxt: '',
                valueInputCP: ''
            }
        },
        components: {
            DateDropdown
        },
        methods: {
            changeDate() {
                console.log('hi')
            },
            getMsgTxt() {
                let data = {}
                data['url'] = this.$root.$options.api['api13']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                // data['phone'] = this.mobile
                // data['type'] = 'gold'
                console.log(data)
                let i = this.$store.dispatch('postApi', data);
                i.then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                    }
                })
            },
            resetPw() {
                this.$store.dispatch('accountNavChange', '1')
                let data = {};
                data['url'] = `${this.$root.$options.api['api16']}${this.uid}/password`;
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['password'] = this.valueInput
                data['number'] = this.msgTxt
                data['confirm_password'] = this.valueInputCP
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                        redirect.redirect('/#/Group', '成功', this.$root.$options['languageSet']['EDITSUCCESS'], 'success')
                    }
                })
            },
            customFormatter(date) {
                var today = new Date(date);
                var dd = today.getDate();
                var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();
                if(dd<10) 
                {
                    dd='0'+dd;
                } 

                if(mm<10) 
                {
                    mm='0'+mm;
                } 
                
                this.valueInput = `${yyyy}-${mm}-${dd}`
                return this.valueInput
            },
            edit(url) {
                this.$store.dispatch('accountNavChange', '1')
                let data = {};
                data['url'] = this.$root.$options.api['api14']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                if(this.title == 'birthday'){
                    let obj = this.valueInput.split('.')
                                        console.log(obj)

                    this.valueInput = `${obj[2]}-${obj[1]}-${obj[0]}`

                    console.log(obj)
                }
                data[this.title] = this.valueInput;
                console.log(data)
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                        redirect.redirect('/#/Group', '成功', this.$root.$options['languageSet']['EDITSUCCESS'], 'success')
                    }
                })
            },
            redirect(url) {
                if(this.valueTitle == 'password') {
                    this.resetPw()
                } else {
                    this.edit(url)
                }
            },
            formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }
        },
        computed: {
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            },
            implyTitle() {
                if(this.title == 'name'){
                    return '真實姓名'
                }
                if(this.title == 'nickname'){
                    return '暱稱'
                }
                if(this.title == 'line_id'){
                    return 'LINE ID'
                }
                if(this.title == 'wechat_id'){
                    return 'WECHAT'
                }
                if(this.title == 'gender'){
                    this.changeInput = 'styleTwo'
                    return '性別'
                }
                if(this.title == 'birthday'){
                    this.changeInput = 'styleThree'
                    return '生日'
                }
                if(this.title == 'password'){
                    this.changeInput = 'styleFour'
                    return '密碼'
                }
                return this.title;
            }
        },
        mounted(){
            this.valueTitle = this.title
            this.valueInput = this.value
            this.currentDay = this.formatDate(new Date())
            window.scroll(0, 0)
            // if(!this.title){
            //     this.$router.push('group')
            // }
        }
    }
</script>