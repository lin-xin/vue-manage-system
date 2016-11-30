<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="container" style="min-height: 800px;">
            <v-content></v-content>
        </div>
        <v-footer></v-footer>
        <router-view></router-view>
    </div>

</template>

<script>
    import header from './header.vue';
    import footer from './footer.vue';
//    import main from './main.vue';
    export default {
        components:{
            'vHead':header,
            'vFooter':footer,
//            'vContent': main
        }
    }

</script>
<style>
    @import "../../../static/css/normalize.css";
    @import "../../../static/css/common.css";
    @import "../../../static/css/index.css";
</style>
