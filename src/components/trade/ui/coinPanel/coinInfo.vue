<template>
    <div class="coinInfo">
        <coinInfoMobile/>
        <coinInfoPc/>
    </div>
</template>
<script>
    import coinInfoMobile from '@/components/trade/ui/coinPanel/coinInfoMobile'
    import coinInfoPc from '@/components/trade/ui/coinPanel/coinInfoPc'

    export default {
        name: 'coinInfo',
        components: {
            coinInfoMobile,
            coinInfoPc
        },
    }
</script>