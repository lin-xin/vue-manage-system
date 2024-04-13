<template>
    <div>
        <el-card class="mgb20">
            <template #header>基础用法</template>
            <el-carousel height="400px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-card>

        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="mgb20">
                    <template #header>轮播图</template>
                    <el-carousel height="300px">
                        <el-carousel-item v-for="item in imgs" :key="item">
                            <el-image class="carousel-img" :src="item" fit="cover" />
                        </el-carousel-item>
                    </el-carousel>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="mgb20">
                    <template #header>卡片模式</template>
                    <el-carousel height="300px" type="card">
                        <el-carousel-item v-for="item in imgs" :key="item">
                            <el-image class="carousel-img" :src="item" fit="cover" />
                        </el-carousel-item>
                    </el-carousel>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
const imgs = [
    'https://cdn.pixabay.com/photo/2017/08/07/08/23/sea-2601374_640.jpg',
    'https://cdn.pixabay.com/photo/2020/02/11/10/24/lake-4839058_640.jpg',
    'https://cdn.pixabay.com/photo/2024/02/21/08/06/coast-8587004_640.jpg',
    'https://cdn.pixabay.com/photo/2023/07/29/10/21/grasshopper-8156626_640.jpg',
];
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    line-height: 400px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.carousel-img {
    width: 100%;
    height: 100%;
}
</style>
