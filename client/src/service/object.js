import request from './request';

export function getObjectDetailApi(appKey, objectKey) {
    return `/api/object/${appKey}/${objectKey}`;
}

export function getAllObjectList(payload = {}) {
    return request({
        method: 'get',
        url: '/api/object/list',
        params: {
            pageSize: payload.pageSize || 50,
            pageNum: payload.pageNum || 1
        }
    });
}
