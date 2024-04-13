import { mix, setProperty } from '@/utils';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => {
        return {
            primary: '',
            success: '',
            warning: '',
            danger: '',
            info: '',
            headerBgColor: '#242f42',
            headerTextColor: '#fff',
        };
    },
    getters: {},
    actions: {
        initTheme() {
            ['primary', 'success', 'warning', 'danger', 'info'].forEach((type) => {
                const color = localStorage.getItem(`theme-${type}`) || '';
                if (color) {
                    this.setPropertyColor(color, type); // 设置主题色
                }
            });
            const headerBgColor = localStorage.getItem('header-bg-color');
            headerBgColor && this.setHeaderBgColor(headerBgColor);
            const headerTextColor = localStorage.getItem('header-text-color');
            headerTextColor && this.setHeaderTextColor(headerTextColor);
        },
        resetTheme() {
            ['primary', 'success', 'warning', 'danger', 'info'].forEach((type) => {
                this.setPropertyColor('', type); // 重置主题色
            });
        },
        setPropertyColor(color: string, type: string = 'primary') {
            this[type] = color;
            setProperty(`--el-color-${type}`, color);
            localStorage.setItem(`theme-${type}`, color);
            this.setThemeLight(type);
        },
        setThemeLight(type: string = 'primary') {
            [3, 5, 7, 8, 9].forEach((v) => {
                setProperty(`--el-color-${type}-light-${v}`, mix('#ffffff', this[type], v / 10));
            });
            setProperty(`--el-color-${type}-dark-2`, mix('#ffffff', this[type], 0.2));
        },
        setHeaderBgColor(color: string) {
            this.headerBgColor = color;
            setProperty('--header-bg-color', color);
            localStorage.setItem(`header-bg-color`, color);
        },
        setHeaderTextColor(color: string) {
            this.headerTextColor = color;
            setProperty('--header-text-color', color);
            localStorage.setItem(`header-text-color`, color);
        }
    }
});