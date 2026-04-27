import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

export interface ApiResponse<T = unknown> {
    code: number;
    data: T;
    message?: string;
    pageTotal?: number;
}

const service: AxiosInstance = axios.create({
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});

service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('vuems_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        ElMessage.error('请求发送失败');
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        }
        ElMessage.error(`请求失败：${response.status}`);
        return Promise.reject(new Error(`HTTP Error: ${response.status}`));
    },
    (error: AxiosError) => {
        let message = '网络错误';
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = '未授权，请重新登录';
                    localStorage.removeItem('vuems_name');
                    window.location.href = '/login';
                    break;
                case 403:
                    message = '拒绝访问';
                    break;
                case 404:
                    message = '请求地址不存在';
                    break;
                case 500:
                    message = '服务器内部错误';
                    break;
                default:
                    message = `连接错误：${error.response.status}`;
            }
        } else if (error.code === 'ECONNABORTED') {
            message = '请求超时';
        }
        ElMessage.error(message);
        return Promise.reject(error);
    }
);

export default service;
