import request from './request';

export function getApplicationList(payload = {}) {
    return request({
        method: 'get',
        url: '/api/application/list',
        params: {
            pageSize: payload.pageSize || 10,
            pageNum: payload.pageNum || 1,
        }
    });
}
