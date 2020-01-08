<template>
    <div class="userRuleFooter">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <input v-model="agree" type="checkbox">
                    <span>我同意：使用者遵守回饋寶使用規章 (遊戲管理規章＋會員服務條款)</span>
                </div>
            </div>
            <div class="row" id="desc">
                <div class="col-12">
                    <span>
                        當您在線上勾選，我同意，並註冊完成，或開始使用本服務時，即推定您已詳細閱讀，了解，並同意遵守本服務條款之約定
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-center">
                    <button class="btn btn-lg btn-primary" @click="doneRead()">確認</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userFooter',
        data() {
            return {
                agree: false
            }
        },
        methods: {
            doneRead() {
                console.log(this.agree)
                if(!this.agree) {
                    let error = {
                        errorMsg: {
                            error: {
                                message: '您必須同意以閱讀使用者手則'
                            }
                        }
                    }

                    // error.errorMsg.error.message = 
                    // console.log(error)
                    this.$store.dispatch('openAlert', error)
                    return
                } else {
                    this.$router.push('contractShop')
                }
            }
        }
    }
</script>