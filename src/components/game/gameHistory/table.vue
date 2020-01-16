<template>
    <div class="gameHistory">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <b-table class="table table-dark" striped hover :items="gameHistory" :fields="fields"></b-table> 
                </div>
            </div>
            <div class="row btn-area-footer">
                <div class="container">
                    <div class="btn btn-sm col-6" @click="toLoadData('minus')">{{this.$root.$options['languageSet']['PREVIOUSPAGE']}}</div>
                    <div class="btn btn-sm col-6" @click="toLoadData('plus')" v-if="lastPage">{{this.$root.$options['languageSet']['NEXTPAGE']}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'gameHistory',
        components: {
        },
        methods: {
            toLoadData(status) {
                if(status == 'minus' && this.page > 1){
                    this.page--
                }
                if(status == 'plus'){
                    this.page++
                }
                let data = {}
                data['url'] = `${this.$root.$options.api['api19']}?page=${this.page}&rows=15`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        if(item['data']['data'].length == 0){
                            this.lastPage = false;
                            this.gameHistory = [];
                        }else{
                             this.gameHistory = item['data']['data']
                        }
                    }
                })
                window.scrollTo(0, 0);
                this.$store.dispatch('gameSec', 3)
            }
        },
        computed: {
            txT(){
                return this.$root.$options['languageSet']
            }
        },
        data() {
            return {
                gameHistory: null,
                fields: {
                    id: {
                        label: this.$root.$options['languageSet']['SERIALNUM'],
                        sortable: true
                    },
                    game_name: {
                        label: this.$root.$options['languageSet']['GAMENAME'],
                        sortable: true
                    },
                    betting: {
                        label: this.$root.$options['languageSet']['TOTALBET'],
                        sortable: true
                    },
                    win: {
                        label: this.$root.$options['languageSet']['TOTALRETURN'],
                        sortable: true
                    },
                    inbound_at: {
                        label: this.$root.$options['languageSet']['STARTGAMETIME'],
                        sortable: true
                    },
                    outbound_at: {
                        label: this.$root.$options['languageSet']['ENDGAMETIME'],
                        sortable: true
                    }
                },
                lastPage: true,
                page: 1
            }
        },
        mounted() {
            this.toLoadData()
        }
    }

</script>