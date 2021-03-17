<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-global"></i>
                    {{$t('i18n.breadcrumb')}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <span>{{$t('i18n.tips')}}</span>
            <el-button
                type="primary"
                @click="$i18n.locale = $i18n.locale === 'zh-cn'?'en':'zh-cn';"
            >{{$t('i18n.btn')}}</el-button>
            <div class="list">
                <h2>{{$t('i18n.title1')}}</h2>
                <p>{{$t('i18n.p1')}}</p>
                <p>{{$t('i18n.p2')}}</p>
                <p>{{$t('i18n.p3')}}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "i18n"
};
</script>

<style scoped>
.list {
    padding: 30px 0;
}
.list p {
    margin-bottom: 20px;
}
</style>
