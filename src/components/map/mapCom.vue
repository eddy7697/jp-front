<template>
    <div class="mapCom">
        <div v-html="htmlString">
        </div>
    </div>
</template>

<script>
    import { appendMap } from '@/assets/js/map.js';
    import * as PIXI from 'pixi.js';
    
    export default {
        name: 'mapCom',
        props: {
        },
        data() {
            this.htmlString = '<div class="mapContent"></div>'
            return {
            }
        },
        mounted() {
            appendMap()
        }
    }
</script>