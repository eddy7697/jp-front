<template>
    <div class="pcFooter">
        <div class="container">
            <div class="row text-center">
                <div class="col">FBK{{this.$root.$options['languageSet']['OFFICIALWEB']}}</div>
                <!-- <a class="col" target="_blank" href="https://web.fbk168.com/"><div>ULG{{this.$root.$options['languageSet']['OFFICIALWEB']}}</div></a> -->
                <!-- <a class="col" target="_blank" href="https://web.fbk168.com/rule.html"><div>使用者條款</div></a> -->
                <!-- <div class="col" @click="toShowRule()">使用者條款</div> -->
            </div>
            <div class="row text-center">
                <img src="@/assets/images/adult-text.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'pcFooter',
        methods: {
            toShowRule() {
                this.$store.dispatch('userRuleModal', true)
            }
        },
        computed: {
        }
    }
</script>