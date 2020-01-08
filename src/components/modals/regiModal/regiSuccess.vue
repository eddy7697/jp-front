<template>
    <div class="regiSuccess">
        <div class="content text-center">
            <h3>加入LINE <br/>每月公告消費優惠</h3>
            <small>回饋寶 <span class="lineSpan">官方LINE</span></small>
            <div class="line" @click="toOpenWindow()">
            </div>
            <div>
                <div class="line-it-button" data-lang="zh_Hant" data-type="friend" data-lineid="@ulk7423r" data-count="true" style="display: none;"></div>
            </div>
            <!-- <small>回饋寶 <span class="fbSpan">官方臉書</span></small>
            <div class="fb">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fucoin168%2F&tabs&width=300&height=100&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId" width="300" height="100" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
            </div> -->
            <h4>您已成功註冊</h4>
            <div>
                <button class="btn btn-primary" @click="redirct()">
                    登入回饋寶
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'regiSuccess',
        methods: {
            redirct(url) {
                window.location = '/'
            },
            toOpenWindow() {
                window.open('https://line.me/R/ti/p/%40534ryvzc#~')
            }
        }
    }
</script>