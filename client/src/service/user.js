import request from './request';

export function login(payload) {
    return request({
        method: 'post',
        url: '/api/auth',
        data: {
            account: payload.account,
            password: payload.password
        }
    })
}

export function logout() {
    return request({
        method: 'delete',
        url: '/api/auth'
    })
}
