<template>
    <div class="stars">
        <img :src="rating(Math.round(item['average_rating']))" alt="">
    </div>
</template>
<script>
    export default {
        name: 'stars',
        props: {
            item: null
        },
        methods: {
            rating(rating) {
                var i = Math.round(rating)
                switch(i) {
                    case null:
                        return require('@/assets/images/contractShop/stars/shop_star_0.png');
                    case 1:
                        return require('@/assets/images/contractShop/stars/shop_star_1.png');
                    case 2:
                        return require('@/assets/images/contractShop/stars/shop_star_2.png');  
                    case 3:
                        return require('@/assets/images/contractShop/stars/shop_star_3.png');  
                    case 4:
                        return require('@/assets/images/contractShop/stars/shop_star_4.png');  
                    case 5:
                        return require('@/assets/images/contractShop/stars/shop_star_5.png');  
                    default:
                    break;
                }
            }
        }
    }
</script>