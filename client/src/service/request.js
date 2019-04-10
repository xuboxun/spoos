import axios from 'axios';


/*
* usage: require({ method: 'get', url: '/test',  })
* */
export default function request(options) {
    const {
        method = 'get',
        url,
        params,
        data,
    } = options;

    if (!url) {
        throw new Error('URL不能为空');
    }

    return axios({
        method,
        url,
        params,
        data,
    }).then(res => {
        console.log(res);
       return res.data;
    }, err => {
        console.log(err);
        return {};
    });
}
