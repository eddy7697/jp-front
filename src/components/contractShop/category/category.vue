<template>
    <div class="category">
        <div class="categoryFilter" v-if="categoryFilterHidden">
            <ul>
                <h4>
                    <span sylte="margin-left:40px;">搜尋:</span>
                    <div v-if="!nearest && hideFirstRow" style="margin-left:10px;">
                        <input @change="filter()" v-model="storeNumber" class="form-control" type="text" placeholder="店家搜尋">
                    </div>
                    <div v-if="hideFirstRow" class="near btn btn-success" @click="findNearest()">
                        <span v-if="!nearest">附近店家</span>
                        <span v-if="nearest">{{this.$root.$options['languageSet']['CANCEL']}}附近</span>
                        <span v-if="nearest">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </span>
                    </div>
                </h4>
                <li>
                    <div v-if="!nearest">
                        <select @change="getSel(1)" v-model="selected" class="city" name="city" id="city">
                            <option value="">選擇區域</option>
                            <option :value="item" v-for="(item,index) in cityJson" :key="index">
                                {{item}}
                            </option>
                        </select>
                    </div>
                    <div v-if="!nearest">
                        <select @change="getSel(1)"  v-model="categoryType" name="categoryType" id="categoryType">
                            <option value="">選擇類別</option>
                            <option value="0">其他</option>
                            <option value="1">食</option>
                            <option value="2">衣</option>
                            <option value="3">住</option>
                            <option value="4">行</option>
                            <option value="5">娛樂</option>
                            <option value="6">3C</option>
                            <option value="8">生活</option>
                        </select>
                    </div>
                </li>
            </ul>
            <div class="text-center col-12" @click="toggleSrh()">
                <i class="fa fa-chevron-up"></i>
            </div>
        </div>
        <div v-if="this.$store.state.contractShop.subNavNu == 1">
            <button class="btn btn-lg float-right" @click="toggleSrh()">
                搜尋/篩選
                <i class="fa fa-search"></i>
            </button>
        </div>
        <div class="item" v-for="(item, index) in items" :key="index">
            <div  @click="openItem(item)">
                <!-- <span class="shopNumber">{{item['code_number']}}</span> -->
                <!-- <img class="greenTag" src="~@/assets/images/contractShop/category/icons/greenTag.png" alt=""> -->
                <img v-if="item['images']['list']" class="photo" :src="item['images']['list'][0]['mobile']" alt="">
            </div>
            <div>
                <ul>
                    <img @click="toLike(item['id'])" class="like-icon" :src="favorIcon(item.is_favorite)" alt="">
                    <img class="recommend" v-if="item.sticky_at" src="~@/assets/images/contractShop/category/icons/icon_cs_nice.png" alt="" />
                    <li>
                        <h2>{{ item.name }}</h2>
                    </li>
                    <!-- <li>
                        <img class="icon" src="" alt="">
                        <span v-for="(obj, cnt) in item['tag_names']" :key="cnt">{{ obj }},</span>
                    </li> -->
                     <li>
                        <img class="icon" src="~@/assets/images/contractShop/category/icons/icon_cs_m_score.png" alt="">
                        <span>評價:<img class="stars_icons" :src="rating(Math.round(item['average_rating']))" alt=""></span>
                    </li>
                    <li>
                        <img class="icon" src="~@/assets/images/contractShop/category/icons/icon_cs_m_place.png" alt="">
                        <span class="cursorPtn" @click="mapFun(item)">{{item.address}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container footer">
            <div class="row text-center">
                 <div class="col-6 text-center">
                    <button v-if="nearest && is_favorite == 0 && !storeNumber" class="btn-lg btn-success" @click="findNearest('minus')">
                        {{this.$root.$options['languageSet']['PREVIOUSPAGE']}}
                    </button> 
                    <button v-if="!nearest && is_favorite == 0 && !storeNumber" class="btn-lg btn-success" @click="loadShopList('minus')">
                        {{this.$root.$options['languageSet']['PREVIOUSPAGE']}}
                    </button>
                    <button v-if="is_favorite && !storeNumber" class="btn-lg btn-success" @click="loadFavoriteList('minus')">
                        {{this.$root.$options['languageSet']['PREVIOUSPAGE']}}
                    </button>
                    <button v-if="
                            !is_favorite &&
                            !nearest &&
                            storeNumber
                            " class="btn-lg btn-success" @click="filter('minus')">
                        {{this.$root.$options['languageSet']['PREVIOUSPAGE']}}
                    </button>
                </div>
                <div class="col-6 text-center">
                    <button v-if="nearest && is_favorite == 0 && !storeNumber" class="btn-lg btn-success" @click="findNearest('plus')">
                        {{this.$root.$options['languageSet']['NEXTPAGE']}}
                    </button>
                    <button v-if="!nearest && is_favorite == 0 && !storeNumber" class="btn-lg btn-success" @click="loadShopList('plus')">
                        {{this.$root.$options['languageSet']['NEXTPAGE']}}
                    </button>
                    <button v-if="is_favorite && !storeNumber" class="btn-lg btn-success" @click="loadFavoriteList('plus')">
                        {{this.$root.$options['languageSet']['NEXTPAGE']}}
                    </button>
                    <button v-if="
                                is_favorite == 0 &&
                                !nearest &&
                                storeNumber
                                " class="btn-lg btn-success" @click="filter('plus')">
                        {{this.$root.$options['languageSet']['NEXTPAGE']}}
                    </button>
                </div>
            </div>
            <div class="row">
                <p class="hidden">{{subNavNu}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import mockCityJson from '@/assets/js/mockCityJson'
    import redirect from './../../../redirect'
    const swal = require('sweetalert2')
    export default {
        name: 'category',
        data() {
            return {
                items: [],
                number: 1,
                lastPage: true,
                is_favorite: 0,
                selected: '',
                storeNumber:'',
                nearest: false,
                cityJson:[],
                subNavFa: false,
                categoryFilterHidden: false,
                lat: '',
                lon: '',
                categoryType: '',
                hideFirstRow: true
            }
        },
        methods: {
            categoryTypeCha() {
                let data = {}
                data['url'] = `${this.$root.$options.api['api6']}?type=${this.categoryType}`    
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        this.items = item['data']['data']
                        if(item['data']['data'].length == 0){
                            this.items = []
                        }
                    }
                })
            },
            toggleSrh() {
                this.categoryFilterHidden = !this.categoryFilterHidden
                if(this.categoryFilterHidden) {
                    this.categoryType = ''
                    this.selected = ''
                    this.storeNumber = ''
                    this.nearest = false
                }
            },
            getNearCate(position) {
                let data = {}
                data['url'] = `${this.$root.$options.api['api6']}/distance?lat=${position.coords.latitude}&lng=${position.coords.longitude}&page=${this.number}`
                this.lat = position.coords.latitude
                this.lon = position.coords.longitude
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        this.items = item['data']['data']
                        this.categoryFilterHidden = false
                    }
                })
            },
            findNearest(page) {
                this.categoryType = ''
                this.selected = ''
                this.storeNumber = ''
                if(page == 'minus' && this.number > 1){
                    this.number--
                }
                if(page == 'plus'){
                    this.number++
                }
                if(!page) {
                    this.nearest = !this.nearest
                    this.number = 1
                }
                if (navigator.geolocation){
                       navigator.geolocation.getCurrentPosition(this.getNearCate)
                }else{
                    swal.fire({
                        title: 'Error!',
                        text: '您的瀏覽器不支援此項功能，請選擇其他瀏覽器。',
                        type: 'error',
                        confirmButtonText: this.$root.$options['languageSet']['CONFIRMTXT']
                    })
                }
            },
            mapFun(item){
                console.log(item)
                // If it's an iPhone..
                if( (navigator.platform.indexOf("iPhone") != -1) 
                    || (navigator.platform.indexOf("iPod") != -1)
                    || (navigator.platform.indexOf("iPad") != -1))
                    window.open(`https://www.google.com/maps/place/${item.address}`);
                else
                    window.open(`https://www.google.com/maps/place/${item.address}`);
            },
            favorIcon(favor) {
                if(favor){
                   return require('@/assets/images/contractShop/category/icons/icon_cs_like_h.png')
                } else {
                   return require('@/assets/images/contractShop/category/icons/icon_cs_like_n.png')
                }
            },
            openItem(item) {
                let data = {}
                data['openItem'] = true
                data['item'] = item
                this.$store.dispatch('openItem', data)
            },
            rating(rating) {
                switch(rating) {
                    case null:
                        return require('@/assets/images/contractShop/littleStars/shop_star_0.png')
                    break;
                    case 1:
                        return require('@/assets/images/contractShop/littleStars/shop_star_1.png')
                    break;
                    case 2:
                        return require('@/assets/images/contractShop/littleStars/shop_star_2.png')
                    break;
                    case 3:
                        return require('@/assets/images/contractShop/littleStars/shop_star_3.png')
                    break;
                    case 4:
                        return require('@/assets/images/contractShop/littleStars/shop_star_4.png')
                    break;
                    case 5:
                        return require('@/assets/images/contractShop/littleStars/shop_star_5.png')
                    break;
                    default:
                }
            },
            toLike(id) {
                let data = {};
                data['url'] = `${this.$root.$options.api['api6']}/${id}/favorite`;
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity_token'] = localStorage.getItem('identity')
                data['id'] = id;
                this.$store.dispatch('postApi', data).then((result)=>{
                    if (result['result'] == 'error') {
                        this.$store.dispatch('openAlert', result)
                    } else {
                        if(!this.nearest){
                            this.loadShopList()
                        } else {
                            let data = {}
                            data['url'] = `${this.$root.$options.api['api6']}/distance?lat=${this.lat}&lng=${this.lon}&page=${this.number}`
                            data['Authorization'] = localStorage.getItem('Authorization')
                            data['identity'] = localStorage.getItem('identity')
                            this.$store.dispatch('getApi', data).then((item)=>{
                                if (item['result'] == 'error') {
                                    this.$store.dispatch('openAlert', item)
                                } else {
                                    this.items = item['data']['data']
                                    this.categoryFilterHidden = false
                                }
                            })
                        }
                    }
                })    
            },
            filter(page) {
                
                if(this.storeNumber){
                    if(!page) {
                        this.number = 1
                    }
                    if(page == 'minus' && this.number > 1){
                        this.number--
                    }
                    if(page == 'plus'){
                        this.number++
                    }
                    let data = {}
                    data['url'] = `${this.$root.$options.api['api6']}?code_number=${this.storeNumber}&page=${this.number}`
                    data['Authorization'] = localStorage.getItem('Authorization')
                    data['identity'] = localStorage.getItem('identity')
                    this.$store.dispatch('getApi', data).then((item)=>{
                        if (item['result'] == 'error') {
                            this.$store.dispatch('openAlert', item)
                        } else {
                            this.items = item['data']['data']
                            // this.categoryFilterHidden = false
                        }
                    })
                } else {
                }
            },
            getSel(option) {
                if(option == 1){
                    this.number = 1 
                }
                let data = {}
                if(this.selected && !this.categoryType) {
                    data['url'] = `${this.$root.$options.api['api6']}?city=${this.selected}&page=${this.number}`
                } else if (this.selected || this.categoryType) {
                    data['url'] = `${this.$root.$options.api['api6']}?city=${this.selected}&type=${this.categoryType}&page=${this.number}`
                }
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        this.items = item['data']['data']
                        if(item['data']['data'].length == 0){
                        }else {
                            this.lastPage = true;
                        }
                    }
                })
            },
            loadFavoriteList(status) {
                if(!status) {
                    this.number = 1
                }
                if(status == 'minus' && this.number > 1){
                    this.number--
                }
                if(status == 'plus'){
                    this.number++
                }

                let data = {}
                data['url'] = `${this.$root.$options.api['api6']}?is_favorite=1&city=${this.selected}&page=${this.number}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        if(item['data']['data'].length == 0){
                            this.items = []
                        }else{
                            this.lastPage = true;
                            this.items = item['data']['data']
                            this.categoryFilterHidden = false
                        }
                    }
                })
            },
            loadShopList(status) {
                if(status == 'minus' && this.number > 1){
                    this.number--
                }
                if(status == 'plus'){
                    this.number++
                }
                if(this.selected) {
                    this.getSel(2)
                    return
                }

                let data = {}
                data['url'] = `${this.$root.$options.api['api6']}?page=${this.number}`
                data['Authorization'] = localStorage.getItem('Authorization')
                data['identity'] = localStorage.getItem('identity')
                this.$store.dispatch('getApi', data).then((item)=>{
                    if (item['result'] == 'error') {
                        this.$store.dispatch('openAlert', item)
                    } else {
                        if(item['data']['data'].length == 0){
                            // this.lastPage = false;
                            this.items = [];
                        }else{
                            this.lastPage = true;
                            this.items = item['data']['data'];
                        }
                    }
                })
            } 
        }, 
        computed:  {
            changeClass() {
                if(this.nearest){
                    return 'btn-danger'
                } else {
                    return 'btn-success'
                }
            },
            sideNav() {
                if(this.$store.state.accountNav.toggleSide) {
                    this.categoryFilterHidden = false
                    if(this.categoryFilterHidden) {
                        this.categoryType = ''
                        this.selected = ''
                        this.storeNumber = ''
                        this.nearest = false
                    }
                }
            },
            subNavNu() {
                if(this.selected || this.categoryType) {
                    this.hideFirstRow = false
                } else {
                    this.hideFirstRow = true
                }
                if(this.$store.state.contractShop.subNavNu == 4) {
                    this.is_favorite = 1
                    this.nearest = false
                    if(!this.subNavFa){
                        this.loadFavoriteList()
                        this.subNavFa = true
                    }
                } else {
                    this.is_favorite = 0
                    this.subNavFa = false
                    if((!this.nearest && !this.selected && !this.categoryType) && !this.storeNumber){
                        this.loadShopList()
                    }
                }
                return this.$store.state.contractShop.subNavNu
            }
        },
        mounted(){
            this.loadShopList()
            this.cityJson = mockCityJson['data']
            window.scrollTo(0, 0)
        }
    }
</script>