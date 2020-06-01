import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
// import { requestHybrid, } from './method';
let baseURL = '';
const env = process.env.NODE_ENV;
if (env === 'development') {
    // baseURL = 'http://eboard.leke.cn';//线上
    // baseURL = 'http://local.leke-eboard.cc';//php本地
}

// axios defaults
axios.defaults.withCredentials = true;
//获取地址栏信息
/**
 * 
 * @param {要获取的地址栏参数名} str string 
 */
function getHerfInfo(str) {
    if (window.location.href.split('?').length == 2) {
        return (window.location.href.split('?')[1].split('&').find(item => item.indexOf(str) != -1) || '=').split('=')[1];
    } else {
        return '';
    }
}
function getItem(key) {
    if (window.location.href.indexOf("phone") != -1) {
        // return 'VFZSQlBRPT07T1Q4N1B6aytQenc3OzEwMTA=';//家长
        // return getHerfInfo('ticket')||'VDBFOVBRPT07TURnN09qQTVPRDA3Ozg4';//班主任
        return getHerfInfo('ticket') || 'VDBFOVBRPT07TURnN09qQTVPRDA3Ozg4';
    } else {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }
}
function axiosRequest(method, url, params, type) {
    switch (method) {
        case 'get':
            return new Promise((resolve) => {
                axios({
                    url: baseURL + url,
                    method: 'get',
                    params: {
                        ...params,
                        t: new Date().getTime(),
                    },
                    headers: { 'token': getItem('token') },
                    timeout: 10000,
                }).then((json) => {
                    json.status === 200 && resolve(json.data);
                }).catch((error) => {
                    console.log(error);
                    message.error('出现错误');
                });
            });
        case 'post':
            return new Promise((resolve) => {
                axios({
                    url: baseURL + url,
                    method: 'post',
                    data: type === 'form' ? qs.stringify(params) : params,
                    headers: { 'token': getItem('token') },
                    timeout: 10000,
                }).then((json) => {
                    json.status === 200 && resolve(json.data);
                }).catch((error) => {
                    console.log(error);
                    message.error('出现错误');
                });
            });
        default:
            break;
    }
}

export default axiosRequest;