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
                    <div class="btn btn-sm col-6" @click="toLoadData('minus')">上一頁</div>
                    <div class="btn btn-sm col-6" @click="toLoadData('plus')" v-if="lastPage">下一頁</div>
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
        data() {
            return {
                gameHistory: null,
                fields: {
                    id: {
                        label: '流水號',
                        sortable: true
                    },
                    game_name: {
                        label: '遊戲名稱',
                        sortable: true
                    },
                    betting: {
                        label: '總下注金額',
                        sortable: true
                    },
                    win: {
                        label: '總返回金額',
                        sortable: true
                    },
                    inbound_at: {
                        label: '開始遊戲時間',
                        sortable: true
                    },
                    outbound_at: {
                        label: '結束時間',
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