import axios from 'axios';
import _ from 'lodash';
// import config from './config';

const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});



instance.interceptors.response.use(
    (response) => {
        // const cookies = response.headers['set-cookie'];

        const { headers, data } = response;
        // do something with headers and data here
        return response.headers + response.data;
    })


export default instance;
