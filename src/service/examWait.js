import axios from 'UTILS/axios';
const getCurrentTime = () => {
    return axios('get', '/auth/global/homework/common/getCurrentTime.htm', {
    }, 'form')
};

export default {
    getCurrentTime
}