<template>
    <div class="shopDesc">
        <div>
        </div>
        <ul>
            <li>
                <span class="shopNumber">{{item['code_number']}}</span>
                <img class="greenTag" src="~@/assets/images/contractShop/category/icons/title.png" alt="">
                <img class="like-icon" :src="favorIcon(item['is_favorite'])" alt="">
                <img class="recommend" v-if="item.recommend_member_id" src="~@/assets/images/contractShop/category/icons/icon_cs_nice.png" alt="" />
            </li>
            <li>
                <img class="toTradeIcon" src="~@/assets/images/contractShop/category/icons/icon_sc_pay.png" alt="" @click="scModalOpen()" />
            </li>
            <li>
                <h2>{{item['name']}}</h2>
            </li>
            <li>
                <img class="icon" src="~@/assets/images/contractShop/category/icons/icon_cs_m_sort.png" alt="">
                <span v-for="(obj, pos) in item['tag_names']" :key="pos">
                    {{obj}}
                </span>
            </li>
            <li>
                <img class="icon" src="~@/assets/images/contractShop/category/icons/icon_cs_m_score.png" alt="">
                <span>評價: <img class="stars_icons" :src="rating(Math.round(item['average_rating']))" alt=""></span>
            </li>
            <li>
                <img class="icon" src="~@/assets/images/contractShop/category/icons/icon_cs_m_place.png" alt="">
                <span class="addr" @click="mapFun(item)">{{item['address']}}</span>
            </li>
            <li>
                <img class="icon" src="~@/assets/images/contractShop/category/icons/icon_cs_m_time.png" alt="">
                <span class="business_time" v-html="item['business_time']"></span>
            </li>
            <li>
                <img class="icon" src="~@/assets/images/contractShop/category/icons/icon_cs_m_tel.png" alt="">
                <span>{{item['phone']}}</span>
            </li>
            <li v-if="item['video_url']">
                <img class="icon" src="~@/assets/images/contractShop/category/icons/icon_video.png" alt="">
                <a :href="item['video_url']" target="_blank">店家相關介紹</a>
            </li>
            <li>
                <img class="icon" src="~@/assets/images/contractShop/category/icons/icon_cs_m_info.png" alt="">
                <span>店家簡介</span>
                <div id="shopDescContent" v-html="item['description']" :class="{'showMore': showMore}">
                </div>
                <span v-if="!showMore">...</span>
                <button v-if="!showMore" class="btn btn-primary col-12" @click="showMore = !showMore">更多資訊</button>
                <button v-if="showMore" class="btn btn-primary col-12" @click="showMore = !showMore">無更多資訊</button>

                <!-- <img id="more" class="icon" @click="showMore = !showMore" src="~@/assets/images/contractShop/category/icons/icon_cs_m_more.png" alt=""> -->
            </li>
        </ul>
        <div>
            <!-- <GmapMarker ref="myMarker"
            :position="google && new google.maps.LatLng(1.38, 103.8)" /> -->
        </div>
    </div>
</template>
<script>
    // import {gmapApi} from 'vue2-google-maps'

    export default {
        name: 'shopDesc',
        props: {
            item: null
        },
        components: {
            // google: gmapApi
        },
        data() {
            return {
                showMore: false
            }
        },
        methods: {
            scModalOpen() {
                this.$store.dispatch('scModal', {show: true, content: {'name': this.item['name'], 'uid': this.item['member_uid']}})
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
            }
        },
        mounted(){
        }
    }

</script>