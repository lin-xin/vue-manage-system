<template>
    <div class="container">
        <el-calendar v-model="value">
            <template #date-cell="{ data }">
                <div>{{ data.date.getDate() }}</div>
                <div class="notes-container" v-if="notes[data.day.toString()]">
                    <div class="notes" v-for="note in notes[data.day.toString()]">
                        <span :class="note.status === 1 ? 'text-success' : 'text-danger'"></span>
                        <div class="note-title">{{ note.title }}</div>
                    </div>
                </div>
            </template>
        </el-calendar>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const value = ref(today);

const todayDate = today.toISOString().slice(0, 10);
const yesterdayDate = yesterday.toISOString().slice(0, 10);

const notes: any = {
    [todayDate]: [
        { title: '吃饭', status: 1 },
        { title: '睡觉', status: 0 },
        { title: '吃饭', status: 1 },
        { title: '睡觉', status: 0 },
        { title: '吃饭', status: 1 },
        { title: '睡觉', status: 0 },
    ],
    [yesterdayDate]: [{ title: '参加会议', status: 0 }],
};
</script>

<style scoped>
.notes-container {
    height: 60px;
    overflow-y: auto;
}

.notes-container::-webkit-scrollbar {
    width: 0;
}

.notes {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 12px;
}

.notes:hover {
    background-color: #eee;
}

.note-title {
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.notes span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
}

.text-success {
    background-color: #5cb85c;
}

.text-danger {
    background-color: #d9534f;
}
</style>
