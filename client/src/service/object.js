import request from './request';

export function getObjectDetailApi(appKey, objectKey) {
    return `/api/static/${appKey}/${objectKey}`;
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

export function uploadObject(payload) {
    return request({
        method: 'post',
        url: `/api/object/${payload.appKey}`,
        data: payload.data
    })
}
