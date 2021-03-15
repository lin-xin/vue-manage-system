<template>
    <div class="about">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                    <!-- <keep-alive :include="tagsList"> -->
                    <router-view v-slot="{ Component }">
                <transition name="move" mode="out-in">
<component :is="Component" />
                </transition>
                    </router-view>
                    <!-- </keep-alive> -->
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from "../components/Header";
import vSidebar from "../components/Sidebar";
import vTags from "../components/Tags.vue";
export default {
    components: {
        vHeader,
        vSidebar,
        vTags
    },
    computed:{
        collapse(){
            return this.$store.state.collapse
        }
    }
};
</script>