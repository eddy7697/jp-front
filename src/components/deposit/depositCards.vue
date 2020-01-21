<template>
    <div class="depositCards">
        <!-- <div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="card">
                       <img src="@/assets/images/credit-cards/mulfunction.png" alt="">
                    </div>
                </div>
            </div>
        </div> -->
        <div class="container">
            <div class="row">
                <div class="col-sm" @click="openModal(500)">
                    <div class="card">
                       <img src="@/assets/images/credit-cards/deposit-500.png" alt="">
                    </div>
                </div>
                <div class="col-sm" @click="openModal(990)">
                    <div class="card">
                        <img src="@/assets/images/credit-cards/deposit-990.png" alt="">
                        <img class="high-img" src="@/assets/images/credit-cards/hot.gif" alt="">
                    </div>
                </div>
                <div class="col-sm" @click="openModal(2000)">
                    <div class="card">
                        <img src="@/assets/images/credit-cards/deposit-2000.png?v=1" alt="">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm" @click="openModal(10000)">
                    <div class="card">
                        <img src="@/assets/images/credit-cards/deposit-10000.png" alt="">
                        <img class="high-img" src="@/assets/images/credit-cards/high.gif" alt="">
                    </div>
                </div>
                <!-- <div class="col-sm" @click="openModal(10000)">
                    <div class="card">
                        <img src="@/assets/images/credit-cards/pay_05.png" alt="">
                        <img class="hot-img" src="@/assets/images/credit-cards/hot.gif" alt="">
                    </div>
                </div> -->
                <div class="col-sm">
                    <div class="card">
                         <img src="@/assets/images/credit-cards/deposit-free.png" alt="">
                         <div class="input-area">
                             <div class="form-group">
                                <div class="">
                                    <input type="number" v-model="buyingAmount" class="form-control input-bgGray" name="amount" id="amount"  placeholder={{this.$root.$options['languageSet']['PLZENTERPRICE']}} min="1" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="">
                                    <input v-model="getCold" type="number" class="form-control" name="amountGold" id="amountGold"  placeholder="可獲得金幣數量(1:100)" min="1" disabled>
                                </div>
                            </div>

                            <div class="text-center" style="margin-top:5px;">
                                <button id="btn-buy-img" class="btn btn-member" @click="openModal(buyingAmount)"
                                >{{this.$root.$options['languageSet']['CONFIRMTXT']}}</button>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
        <payStyle :buyingAmount="buyingAmount" v-if="payModal"/>
        <noEcModal v-if="noEcModal"/>
    </div>
</template>
<script>
    import payStyle from '@/components/modals/deposit/payStyle'
    import noEcModal from '@/components/modals/deposit/noEcModal'
    const swal = require('sweetalert2')

    export default {
        name: 'depositCards',
        data(){
            return {
                buyingAmount: '',
                getGold: 0
            }
        },
        components: {
            payStyle,
            noEcModal
        },
        methods: {
            openModal(amount) {
                console.log(amount)
                if(Number(amount) < 100) {
                    swal.fire({
                        title: 'Error!',
                        text: this.$root.$options['languageSet']['LEASTMONEY'],
                        type: 'error',
                        confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                    })
                    return
                }
                this.buyingAmount = amount
                this.$store.dispatch('payModal', true)
            }
        },
        computed: {
            payModal() {
                return this.$store.state.modalControl.payModal
            },
            noEcModal() {
                return this.$store.state.modalControl.noEcModal
            },
            getCold() {
                return this.buyingAmount*100 ? this.buyingAmount*100 : 0
            }
        }
    }
</script>
 