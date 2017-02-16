<template>
    <div id="app">
        <div class="wrapper">
            <v-head></v-head>
            <v-sidebar></v-sidebar>
            <div class="content">
                <transition name="move" mode="out-in"><router-view></router-view></transition>
            </div>
        </div>
    </div>
</template>
<script>
    import header from './components/common/header.vue';
    import sidebar from './components/common/sidebar.vue';
    export default {
        components:{
            'vHead':header,
            'vSidebar':sidebar
        }
    }
</script>
<style>
    @import "../static/css/main.css";
</style>