import request from '../utils/request';

export const getresData = query => {
    return request({
        url: 'http://127.0.0.1:8000/tc/resource',
        method: 'get',
        params: query
    });
};

export const deleteresData = query => {
  return request({
      url: 'http://127.0.0.1:8000/tc/resource',
      method: 'delete',
      params: query
  });
};
