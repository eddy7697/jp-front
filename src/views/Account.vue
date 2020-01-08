<template>
    <div class="Account">
        <accountInfoPanelWeb :name="name" :level="level" :uid="uid" />
        <accountInfoPanelMobile :name="name" :level="level" :uid="uid" />
        <accountSec />
        <personalTable v-if="secNavPosition == '1'"  :name="name" :level="level" :uid="uid" />
        <accountHistoryTable v-if="secNavPosition == '2'" />
        <groupNav  v-if="secNavPosition == '3'"/>
    </div>
</template>

<script>
import accountInfoPanelWeb from '@/components/account/accountInfo/accountInfoPanelWeb'
import accountInfoPanelMobile from '@/components/account/accountInfo/accountInfoPanelMobile'
import personalTable from '@/components/account/ui/personalTable'
import accountSec from '@/components/secondNav/accountSec'
import accountHistoryTable from '@/components/account/ui/aHistoryTable/accountHistoryTable'
import groupNav from '@/components/group/groupNav'

export default {
    name: 'Account',
    components: {
        accountInfoPanelWeb,
        accountInfoPanelMobile,
        accountHistoryTable,
        accountSec,
        personalTable,
        groupNav
    },
    methods: {
    },
    computed: {
        name() {
            return this.$store.state.memberInfo.userInfo['nickname'];
        },
        level() {
            return this.$store.state.memberInfo.userInfo['level'];
        },
        uid() {
            return this.$store.state.memberInfo.userInfo['uid'];
        },
        secNavPosition() {
            return this.$store.state.accountNav['accountNavPosition'];
        }
    },
    mounted() {
        this.$store.dispatch('accountNavChange', '2')
    }
}
</script>