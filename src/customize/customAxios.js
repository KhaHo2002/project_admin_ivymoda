import axios from "axios";
import axiosRetry from 'axios-retry';

let store;
export const injectStore = _store => {
    store = _store
}
const instance = axios.create({
    withCredentials: true
});
axiosRetry(instance, {
    retries: 3,
    retryCondition: (err) => {
        return err.response.status === 400 || err.response.status === 405
    },
    retryDelay: (retryCount, err) => {
        return retryCount * 500;
    }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = `Bearer ${store.getState()?.accountReducer?.account?.access_token ?? ""}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    if (error && error.response.data) return error.response.data;
    return Promise.reject(error);
});


export default instance;