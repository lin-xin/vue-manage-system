<template>
    <span ref="countRef"></span>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { CountUp } from 'countup.js';

const props = defineProps({
    end: {
        type: Number,
        required: true,
    },
    options: {
        type: Object,
        default: () => ({}),
        required: false,
    },
});

const countRef = ref<any>(null);
let countUp: any;
onMounted(() => {
    countUp = new CountUp(countRef.value, props.end, props.options);
    if (countUp.error) {
        console.error(countUp.error);
        return;
    }
    countUp.start();
});

watch(() => props.end, (newVal) => {
    if (countUp) {
        countUp.update(newVal);
    }
});


</script>