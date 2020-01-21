<template>
    <div class="editForm">
        <div class="container">
            <div class="row">
                <div class="content">
                    <div v-if="changeInput == 'styleOne'">
                        <fieldset class="form-group col-12">
                            <label for="formTitle">暱稱*</label>
                            <input type="formTitle" v-model="nickname" class="form-control" name="formTitle" id="formTitle" placeholder="">
                        </fieldset>
                        <fieldset class="form-group col-12">
                            <label for="formTitle">LINE ID</label>
                            <input type="formTitle" v-model="line" class="form-control" name="formTitle" id="formTitle" placeholder="">
                        </fieldset>
                        <fieldset class="form-group col-12">
                            <label for="formTitle">E-Mail</label>
                            <input type="formTitle" v-model="email" class="form-control" name="formTitle" id="formTitle" placeholder="">
                        </fieldset>
                        <fieldset class="form-group col-12">
                            <label for="formTitle">性別</label>
                            <div>
                                <input type="radio" name="gender" v-model="gender" value="male"> 男<br>
                                <input type="radio" name="gender" v-model="gender" value="female"> 女<br>
                            </div>
                        </fieldset>
                        <fieldset class="form-group col-12">
                            <label for="formTitle">生日</label>
                            <div class="row">
                                <div class="col-4">
                                    <select @change="calculate_age()" v-model="pyear" class="form-control" name="" id="">
                                        <option value="">年</option>
                                        <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <select @change="calculate_age()" v-model="pMonth" class="form-control" name="" id="">
                                        <option value="">月</option>
                                        <option value="01">1月</option>
                                        <option value="02">2月</option>
                                        <option value="03">3月</option>
                                        <option value="04">4月</option>
                                        <option value="05">5月</option>
                                        <option value="06">6月</option>
                                        <option value="07">7月</option>
                                        <option value="08">8月</option>
                                        <option value="09">9月</option>
                                        <option value="10">10月</option>
                                        <option value="11">11月</option>
                                        <option value="12">12月</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <select @change="calculate_age()" v-model="pDay"  class="form-control" name="" id="">
                                        <option value="">日</option>
                                        <option v-for="day in days" :value="day" :key="day">{{ day < 10 ? day.slice(1,2) : day }}</option>
                                    </select>
                                </div>
                            </div>
                            <p class="text-danger" v-if="age < 15">加入會員須年滿15歲</p>
                        </fieldset>
                        <fieldset class="form-group col-12">
                            <label for="formTitle">真實姓名</label>
                            <input type="formTitle" v-model="name" class="form-control" name="formTitle" id="formTitle" placeholder="">
                        </fieldset>
                    </div>
                    <fieldset class="form-group" v-if="changeInput == 'styleFour'">
                        <label for="formTitle">密碼*</label>
                        <input type="formTitle" v-model="valueInput" class="form-control" name="formTitle" id="formTitle" placeholder="新密碼">
                        <input type="formTitle" v-model="valueInputCP" class="form-control" name="formTitle" id="formTitle" placeholder="再次確認密碼">
                        <div class="input-group">
                            <input type="text" v-model="msgTxt" class="form-control" name="code" id="code" maxlength="20" required placeholder="簡訊驗證碼">
                            <div class="input-group-append">
                                <button class="btn btn-secondary btn-success" type="button" id="get_code" @click="getMsgTxt()">取得簡訊驗證碼</button>
                            </div>
                        </div>
                    </fieldset>

                    <div class="col-12">
                        <div class="text-danger">
                            <h6>*若尚未領取任務獎勵1000分禮券，請填寫完成後，再至信件夾按［領取]</h6>
                        </div>
                    </div>
                    <div class="row">
                        <button class="col-6" @click="cancel()">{{this.$root.$options['languageSet']['CANCEL']}}</button>
                        <button class="col-6" @click="redirect('Group')">{{this.$root.$options['languageSet']['CONFIRMTXT']}}</button>
                    </div>
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
                valueInputCP: '',
                nickname: '',
                line: '',
                email: '',
                gender: '',
                name:'',
                birthday: '',
                pyear: '',
                pMonth: '',
                pDay: '',
                age: 0
            }
        },
        components: {
            DateDropdown
        },
        methods: {
            calculate_age() {
                var today_date = new Date();
                var today_year = today_date.getFullYear();
                var today_month = today_date.getMonth();
                var today_day = today_date.getDate();
                this.age = today_year - this.pyear;
                console.log(this.pyear)
                console.log(this.pMonth)
                console.log(this.pDay)
                if ( today_month < (this.pMonth - 1))
                {
                    this.age--;
                }
                if (((this.pMonth - 1) == today_month) && (today_day < this.pDay))
                {
                    this.age--;
                }
                return this.age;
            },
            cancel() {
                this.$router.push('Group')
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
                data['url'] = this.$root.$options.api['api15']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['password'] = this.valueInput
                data['number'] = this.msgTxt
                data['confirm_password'] = this.valueInputCP
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                        this.$store.dispatch('adsModal', true)
                        // redirect.redirect('/#/Group', '成功', this.$root.$options['languageSet']['EDITSUCCESS'], 'success')
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
                data['url'] = this.$root.$options.api['api14'];
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                if(this.nickname) {
                    data['nickname'] = this.nickname
                }
                if(this.line) {
                    data['line_id'] = this.line
                }
                if(this.email) {
                    data['email'] = this.email
                }
                if(this.gender) {
                    data['gender'] = this.gender
                }
                if(this.name) {
                    data['name'] = this.name
                }   
                if(this.pMonth || this.pyear || this.pyear ) {
                    data['birthday'] = `${this.pyear}-${this.pMonth}-${this.pDay}`
                }
                console.log(data)
                this.$store.dispatch('putApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                        this.$store.dispatch('adsModal', true)
                        // redirect.redirect('/#/Group', '成功', this.$root.$options['languageSet']['EDITSUCCESS'], 'success')
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
            years () {
                const year = new Date().getFullYear()
                return Array.from({length: year - 1900}, (value, index) => 1901 + index).reverse()
            },
            days () {
                var m = parseInt(this.pMonth.toString().slice(0, 2));
                var y = parseInt(this.pyear.toString().slice(2, 6));
                var returnArr = [];
                switch (m) {
                case 1: case 3: case 5: case 7: case 8:case 10: case 12:
                    for(let i = 1; i <= 31; i++){
                        if(i < 10){
                            returnArr.push(`0${i}`)
                        } else {
                            returnArr.push(i)
                        }
                    }
                return returnArr;
                case 2:  
                if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
                    for(let i = 1; i <= 29; i++){
                        if(i < 10){
                            returnArr.push(`0${i}`)
                        } else {
                            returnArr.push(i)
                        }
                    }
                    return returnArr;
                    } else {
                    for(let i = 1; i <= 28; i++){
                        if(i < 10){
                            returnArr.push(`0${i}`)
                        } else {
                            returnArr.push(i)
                        }
                    }
                    return returnArr;
                    }
                default:
                    for(let i = 1; i <= 30; i++){
                        if(i < 10){
                            returnArr.push(`0${i}`)
                        } else {
                            returnArr.push(i)
                        }
                    }
                    return returnArr;
                }
            },
            uid() {
                return this.$store.state.memberInfo.userInfo['uid']
            },
            adsModal() {
                return this.$store.state.modalControl.adsModal
            }
        },
        mounted(){
            this.$store.dispatch('adsModal', false)
            this.valueTitle = this.title
            this.valueInput = this.value
            if(this.title == 'password'){
                this.changeInput = 'styleFour'
                window.scroll(0, 0)
                return '密碼'
            }
            this.nickname = this.$store.state.memberInfo.userInfo['nickname']
            this.line = this.$store.state.memberInfo.userInfo['line_id']
            this.email = this.$store.state.memberInfo.userInfo['email']
            this.gender = this.$store.state.memberInfo.userInfo['gender']
            this.name = this.$store.state.memberInfo.userInfo['name']
            // this.birthday = this.$store.state.memberInfo.userInfo['birthday']            
            if(this.$store.state.memberInfo.userInfo['birthday']) {
                let objDefaultA = this.$store.state.memberInfo.userInfo['birthday'].split('-')
                this.pyear = objDefaultA[0]
                this.pMonth = objDefaultA[1]
                this.pDay = objDefaultA[2]
                let obj = this.valueInput.split('.')
                this.valueInput = `${obj[2]}-${obj[1]}-${obj[0]}`
            }
            
            this.currentDay = this.formatDate(new Date())
            window.scroll(0, 0)
            // if(!this.title){
            //     this.$router.push('group')
            // }
        }
    }
</script>