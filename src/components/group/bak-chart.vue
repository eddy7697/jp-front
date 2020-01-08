<template>
    <div class="chart">
        <div class="container">
            <div class="row">
                <div class="col-12">
                      <div id="chart-container"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>  
    import '@/plugins/orgchart/css/orgchart.css'
    import OrgChart from '@/plugins/orgchart/orgchart.js'
    export default {
        name: 'chart',
        data () {
            return {
               level: 6,
               apiUid: '',
            }
        },
        methods: {
            getChartData() {
                let data = {}
                data['url'] = `${this.$root.$options.api['api20']}?depth=${this.level}`

                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        console.log('4321', item['data'])
                        var orgchart = new OrgChart({
                            'data' : item['data'],
                            'depth': 6,
                            'nodeContent': 'uid'
                        });
                        this.dsForm = item['data']
                        document.querySelector('#chart-container').appendChild(orgchart); 
                    }
                })
            }
        },
        components: {
        },
        mounted() {   
            this.apiUid = this.$store.state.memberInfo.userInfo['uid']
            this.getChartData()
            console.log('314',this.apiUid)
        }
    }
</script>

<style lang="css" scope>
    /* org-chart .node .rightEdge {
        background: black;
    } */
</style>