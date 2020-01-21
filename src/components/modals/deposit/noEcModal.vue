<template>
    <div class="noEcModal">
        <div class="content">
            <p class="text-danger text-center">銀行代碼 050 <br/>
                帳號 15412031218</p>
           <img class="depositS" src="~@/assets/images/modals/depositS.png?v=3" alt="">
           <div class="row">
               <div class="container" style="margin-top:15px;">
                   <div class="col-12 text-center">
                        <button class="btn btn-primary" @click="closeModal()">{{this.$root.$options['languageSet']['CONFIRMTXT']}}</button>
                   </div>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    import redirect from '../../../redirect'
    export default {
        name: 'noEcModal',
        methods: {
            closeModal() {
                this.$store.dispatch('noEcModal', false)
                this.$store.dispatch('depositNav', 3)
                this.$store.dispatch('depositTable', true)
            }
        }
    }
</script>