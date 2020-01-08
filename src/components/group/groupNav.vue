<template>
    <div class="groupNav">
        <div class="container">
            <div class="row">
                <div class="coins-navigation">
                    <div :class="{'active': activeNav == 'friends'}" @click="()=>{toggle('friends')}">
                        我的好友
                    </div>
                    <div :class="{'active': activeNav == 'inviFd'}"  @click="()=>{toggle('inviFd')}">
                        邀請中
                    </div>
                    <div :class="{'active': activeNav == 'MP'}"  @click="()=>{toggle('MP')}">
                        雲端好友
                    </div>
                    <div :class="{'active': activeNav == 'group'}"  @click="()=>{toggle('group')}">
                        我的社群
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