<template>
    <div class="newsTable">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <b-table @row-clicked="expandAdditionalInfo" class="table table-dark" striped hover :items="news" :fields="fields"></b-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'newsTable',
        components: {
        },
        methods: {
            expandAdditionalInfo(item) {
                this.$store.dispatch('newsModal', {show: true, content: item})
            }
        },
        data() {
            return {
                news: [],
                fields: {
                    title: {
                        label: '標題',
                        sortable: true
                    },
                    enabled_at: {
                        label: '日期',
                        sortable: true
                    }
                }
            }
        },
        mounted() {
            let data = {}
            data['url'] = this.$root.$options.api['api40']
            data['Authorization'] = localStorage.getItem('Authorization')
            data['identity'] = localStorage.getItem('identity')
            this.$store.dispatch('getApi', data).then((item)=>{
                if (item['result'] == 'error') {
                    this.$store.dispatch('openAlert', item)
                } else {
                    item['data'].forEach((item)=>{
                        console.log(item)
                        if(item['type'] == '1') {
                            this.news.push(item)
                        }
                    })
                    // item.reverse()
                }
            })
            window.scrollTo(0, 0);
        }
    }

</script>