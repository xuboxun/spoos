import request from './request';

export function getApplicationList(payload = {}) {
    return request({
        method: 'get',
        url: '/api/application/list',
        params: {
            type: payload.type,
            keyword: payload.keyword,
            pageSize: payload.pageSize || 10,
            pageNum: payload.pageNum || 1,
        }
    });
}

export function getApplicationDetail(appId) {
    return request({
        method: 'get',
        url: `/api/application/detail/${appId}`,
    })
}

export function getApplicationObjects(appId) {
    return request({
        method: 'get',
        url: `/api/application/objects/${appId}`
    })
}

export function createApplication(payload) {
    return request({
        method: 'post',
        url: '/api/application/create',
        data: {
            appName: payload.appName,
            appInfo: payload.appInfo
        }
    })
}

export function isNameExisted(payload) {
    return request({
        method: 'get',
        url: '/api/application/checkName',
        params: {
            appName: payload.appName
        }
    })
}
