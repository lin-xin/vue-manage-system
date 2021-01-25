import request from '../utils/request';

export const gettagsData = query => {
    return request({
        url: 'http://127.0.0.1:8000/tags',
        method: 'get',
        params: query
    });
};


export const uptagsData = query => {
    return request({
        url: 'http://127.0.0.1:8000/tags',
        method: 'put',
        params: query
    });
};

export const addTagrData = query => {
    return request({
        url: 'http://127.0.0.1:8000/tags',
        method: 'post',
        params: query
    });
};


export const deletetagsData = query => {
    return request({
        url: 'http://127.0.0.1:8000/tags',
        method: 'delete',
        params: query
    });
};