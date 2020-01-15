<template>
    <div class="groupNav">
        <div class="container">
            <div class="row">
                <div class="coins-navigation">
                    <div :class="{'active': activeNav == 'friends'}" @click="()=>{toggle('friends')}">
                        {{this.$root.$options['languageSet']['MYFRIENDS']}}
                    </div>
                    <div :class="{'active': activeNav == 'inviFd'}"  @click="()=>{toggle('inviFd')}">
                        {{this.$root.$options['languageSet']['INVITING']}}
                    </div>
                    <div :class="{'active': activeNav == 'MP'}"  @click="()=>{toggle('MP')}">
                        {{this.$root.$options['languageSet']['CLOUDFRIENDS']}}
                    </div>
                    <div :class="{'active': activeNav == 'group'}"  @click="()=>{toggle('group')}">
                        {{this.$root.$options['languageSet']['MYGROUPS']}}
                    </div>
                </div>
            </div>
            <chart v-if="activeNav == 'group'" />
            <myGoodFd v-if="activeNav == 'friends'"  />
            <mp v-if="activeNav == 'MP'" />
            <inviTable v-if="activeNav == 'inviFd'" />
        </div>
    </div>
</template>

<script>
    import chart from '@/components/group/chart'
    import myGoodFd from '@/components/group/myGoodFd'
    import mp from '@/components/group/mp'
    import inviTable from '@/components/group/inviTable'

    export default {
        name: 'groupNav',
        data () {
            return {
                activeNav: 'group'
            }
        },
        components: {
            chart,
            myGoodFd,
            mp,
            inviTable
        },
        methods: {
            toggle (string) {
                this.activeNav = string;
            }
        }
    }
</script>