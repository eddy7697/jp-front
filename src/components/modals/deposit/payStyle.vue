 <template>
    <div class="payStyle">
        <div class="content">
            <img class="del" src="~@/assets/images/modals/icon-cancel.png" alt="" @click="closeModal()">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h4 for="recipient-name" class="control-label">1. 付款方式:</h4>
                    </div>
                    <!-- <div class="col-6 pull-right"><button class="btn btn-primary btn-md" @click="paymentStyle('1')">信用卡</button></div> -->
                    <div class="col-12 text-center"><button style="margin:30px;" class="btn btn-primary btn-success"  @click="paymentStyle('2')">ATM</button></div>
                </div>
                <div class="row text-center">
                    <div class="col-12">
                        <h5 v-if="payment_type == 1">信用卡付款</h5>
                        <h5 v-if="payment_type == 2">ATM付款</h5>
                    </div>
                </div>
                <div class="row" id="desc"  v-if="payment_type == 1">
                    <div class="col-12 text-center text-danger">
                        <span>信用卡單筆上限20,000元</span><br/>
                        <span>單月信用卡上限剩餘金額：40,000元</span>
                    </div>
                </div>
                <div class="row" id="desc" v-if="payment_type == 2">
                    <div class="col-12 text-center text-danger">
                        <span>ATM虛擬帳號單筆上限100,000元</span><br/>
                        <span>單月虛擬帳號上限剩餘金額： 300,000 元</span>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12">
                        <h4 for="recipient-name" class="control-label">2.選擇發票:</h4>
                        <div class="form-group">
                            <div class="radio">
                                <label>
                                    <input v-model="type" type="radio" name="invoice_type" id="invoice_type_1" value="0" checked>
                                    二聯式發票(個人)
                                </label>
                            </div>
                            <div class="radio">
                                <label>
                                    <input v-model="type" type="radio" name="invoice_type" id="invoice_type_2" value="1">
                                    三聯式發票(公司)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <h4 for="recipient-name" class="control-label">3.填入資訊:</h4>
                        <label for="invoice_name">姓名/公司名稱</label><br/>
                        <small class="text-danger">(*請填寫能收取紙本發票掛號信之真實姓名*)</small>
                        <input v-model="username" type="text" id="invoice_name" name="invoice_name" class="form-control input-bgGray" placeholder="姓名" required>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label for="invoice_phone">手機</label>
                        <input v-model="phone" type="tel" id="invoice_phone" name="invoice_phone" pattern="09[0-9]{8}" class="form-control input-bgGray" placeholder="電話" required>
                        <small id="invoice_phone_help" class="form-text text-muted">請符合格式：0912345678</small>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label id="invoice_address_label" for="invoice_address">通訊地址(必填)</label>
                        <input v-model="address" type="text" id="invoice_address" name="invoice_address" class="form-control input-bgGray" placeholder="此地址為活動贈品寄送地址，請務必填寫正確。" required>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label id="invoice_email_label" for="invoice_email">電子信箱(
                            <span v-if="
                            (notify_way !== 'donate' && notify_way !== 'paper') || 
                            (notify_way !== 'paper' && type == '0')
                            ">必填</span>
                            <span v-if="
                            notify_way == 'donate' ||
                            notify_way == 'paper' || 
                            (notify_way == 'paper' && type == '0')
                            ">選填</span>
                        )</label>
                        <input type="email" v-model="email" id="invoice_email" name="invoice_email" class="form-control input-bgGray" placeholder="電子信箱" required>
                    </div>
                </div>
                <div class="row" v-if="
                                       (type == '1' && notify_way == 'donate')
                                       ">
                    <div class="form-group">
                        <label for="invoice_tax_number">捐贈碼</label>
                        <span v-if="notify_way == 'donate' || notify_way == 'paper'">(選填)</span>
                        <input type="text" name="invoice_tax_number" id="invoice_tax_number" class="form-control input-bgGray" placeholder="統一編號">
                    </div>
                </div>
                <div class="row" v-if="type == '1' && notify_way !== 'donate'">
                    <div class="form-group">
                        <label for="invoice_tax_number">統一編號</label>
                        <input v-model="tax_number" type="text" name="invoice_tax_number" id="invoice_tax_number" class="form-control input-bgGray" placeholder="統一編號">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-12">
                                <h4 for="invoice_notify_way">4.發票寄送方式</h4>
                            </div>
                        </div>
                        <ul >
                            <li v-if="type == 0">
                                <span class="radio invoice_b2c">
                                    <label>
                                        <input v-model="notify_way" type="radio" name="invoice_notify_way" value="1" checked>email通知(個人)
                                    </label>
                                </span>
                            </li>
                            <li v-if="type == 1">
                                <span class="radio invoice_b2c">
                                    <label>
                                        <input v-model="notify_way" type="radio" name="invoice_notify_way" value="1" checked>email通知(公司)
                                    </label>
                                </span>
                            </li>
                            <li>
                                <span class="radio">
                                    <label>
                                        <input v-model="notify_way" type="radio" name="invoice_notify_way" value="2">紙本寄送
                                    </label>
                                </span>
                            </li>
                            <li  v-if="type == '0' || payment_type == 2 && notify_way !== '1'">
                                <span class="radio invoice_b2c">
                                    <label>
                                        <input v-model="notify_way" type="radio"  name="invoice_notify_way" value="4">捐贈
                                    </label>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-12">
                                <label for="ecpay_enable">付款方式</label>
                            </div>
                        </div>
                        <ul >
                            <li>
                                <span class="radio invoice_b2c">
                                    <label>
                                        <input v-model="ecpay_enable" type="radio" name="ecpay_enable" value="0" checked>綠界
                                    </label>
                                </span>
                            </li>
                            <li>
                                <span class="radio invoice_b2c">
                                    <label>
                                        <input v-model="ecpay_enable" type="radio" name="ecpay_enable" value="1" checked>其他
                                    </label>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div> -->
                <hr>
                <div class="row">
                    <span class="col-12 text-center">
                        <button type="button" class="btn btn-secondary" @click="closeModal()">關閉</button>
                        <input type="submit" class="btn btn-primary" id="add_invoice_submit" value="下一步" @click="sendCreateApi()">
                    </span>
                </div>
                <form id="ecform" class="hidden" action="" method="POST">
                    <input type="submit" value="Submit">
                </form> 
            </div>
        </div>

    </div>
 </template>
 <script>
    import ecForm from './../../../ecForm'
    import redirect from './../../../redirect'
     export default {
         name: 'payStyle',
         props: {
             buyingAmount: Number
         },
         data() {
             return {
                invoice_type: '0',
                ecpay_enable: '0',
                invoice_notify_way:'paper',
                payment_type: '2',
                email: '',
                phone: '',
                address: '',
                username: '',
                tax_number: '',
                type: 0,
                notify_way: '1',
                charity_code: ''
             }
         },
         methods: {
             paymentStyle(payment){
                 this.payment_type = payment
             },
             closeModal() {
                this.$store.dispatch('payModal', false)
             },
             sendSpecialOrder() {
                let data = {};
                data['url'] = 'api/v1/order/special'
                data['pack_name'] = 'red_card_pack'
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['amount'] = this.buyingAmount
                data['email'] = this.email
                data['phone'] = this.phone
                data['address'] = this.address
                data['username'] = this.username
                data['tax_number'] = this.tax_number
                data['payment_type'] = this.payment_type
                data['notify_way'] = this.notify_way
                data['type'] = this.type
                // data['ecpay_enable'] = this.ecpay_enable
                
                if(this.type == 0){
                    data['tax_number'] = ''
                }
                if(this.charity_code){
                    data['charity_code'] = this.charity_code
                }
                console.log(data)

                this.$store.dispatch('postApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                        redirect.redirect('/#/deposit', '錯誤', result.error.message, 'error', true)
                    } else {
                        if(result['data']['ecpay_enable'] == '1') {
                            ecForm.ecPay(result['data'])
                        } else {
                            this.$store.dispatch('noEcModal', true)
                        }   
                    }
                })    
             },
             sendCreateApi() {
                if(this.buyingAmount == 990) {
                    this.sendSpecialOrder()
                    return
                }
                let data = {};
                data['url'] = this.$root.$options.api['api43']
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['amount'] = this.buyingAmount
                data['email'] = this.email
                data['phone'] = this.phone
                data['address'] = this.address
                data['username'] = this.username
                data['tax_number'] = this.tax_number
                data['payment_type'] = this.payment_type
                data['notify_way'] = this.notify_way
                data['type'] = this.type
                
                if(this.type == 0){
                    data['tax_number'] = ''
                }
                if(this.charity_code){
                    data['charity_code'] = this.charity_code
                }
                console.log(data)

                this.$store.dispatch('postApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                        redirect.redirect('/#/deposit', '錯誤', result.error.message, 'error', true)
                    } else {
                        console.log(result['data'])
                        if(result['data']['ecpay_enable'] == '1') {
                            ecForm.ecPay(result['data'])
                        } else {
                            this.$store.dispatch('noEcModal', true)
                        }   
                    }
                })    
             }
         },
         mounted(){
         }
     }
 </script>