import request from './request';

export function auth() {
    return request({
        method: 'get',
        url: '/api/auth'
    })
}

export function login(payload) {
    return request({
        method: 'post',
        url: '/api/login',
        data: {
            account: payload.account,
            password: payload.password
        }
    })
}

export function logout() {
    return request({
        method: 'get',
        url: '/api/logout'
    })
}
