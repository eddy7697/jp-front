<template>
    <div class="giftPanel">
        <div class="container">
            <div class="row">
                <span class="col-3 p-0">
                <img style="width:100%;" class="spin-coin img-responsive" src="@/assets/images/mainPage/spin_gift_coin.gif" alt="">
            </span>
            <span id="specilRowPadding" class="col-9">
                <ul>
                    <li>   
                        <span class="circleRound text-center">
                            我的禮券
                        </span>
                        <span class="number">
                            {{gift}}
                        </span>
                    </li> 
                    <li>
                        <span class="circleRound text-center">
                            立即折抵
                        </span>
                        <span class="number">
                            {{giftDivide}}
                        </span>
                    </li>
                </ul>
            </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'giftPanel',
        computed: {
            gift() {
                return Number(this.$store.state.memberInfo.userInfo.gift).toLocaleString()
            }, 
            giftDivide() {
                return Math.ceil((this.$store.state.memberInfo.userInfo.gift/200)).toLocaleString()
            }
        }

    }
</script>