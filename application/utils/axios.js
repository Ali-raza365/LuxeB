import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import store from '../store/Store';

const { dispatch, getState } = store;

export async function getHeaders() {
    let token = await AsyncStorage.getItem('token');
    if (token) {
        token = JSON.parse(token);
        // console.log(token, 'header')
        return {
            authorization: `Token ${token}`,
        };
    }
    return {};
}

export async function apiReq(
    endPoint,
    data,
    method,
    headers,
    requestOptions = {}
) {

    return new Promise(async (res, rej) => {
        const getTokenHeader = await getHeaders();
        headers = {
            ...getTokenHeader,
            ...headers
        };

        if (method === 'get' || method === 'delete') {
            data = {
                ...requestOptions,
                ...data,
                headers
            };
        }

        axios[method](endPoint, data, { headers })
            .then(result => {
                const { data } = result;

                if (data.status === false) {
                    return rej(data);
                }
                return res(data);
            })
            .catch(error => {
                // console.log(error)
                // console.log(error && error.response, 'the error respne')
                if (error && error.response && error.response.status === 401) {
                    // clearUserData();
                    // NavigationService.resetNavigation();
                    //NavigationService.navigate('loginUsingEmailScreen');
                    // dispatch({
                    //     type: types.CLEAR_REDUX_STATE,
                    //     payload: {}
                    // });
                    // dispatch({
                    //     type: types.NO_INTERNET,
                    //     payload: { internetConnection: true },
                    // });


                }
                if (error && error.response && error.response.data) {
                    if (error.response.status == 413)
                        return rej('Attachment size should be less than 5MB');
                    else if (error.response.status == 401)
                        return rej({ message: error?.response?.data?.detail, ...error.response });
                    else if (error?.response?.data?.message)
                        return rej({ message: error?.response?.data?.message });
                    else if (error?.response?.data?.error)
                        return rej({ message: error?.response?.data?.error });
                    else if (error.response.data)
                        return rej({ message: JSON.stringify(error.response.data) });


                    // if (error.request) {
                    //     return rej('Server is not responding. Please try again');
                    // }

                    if (!error.response.data.message) {
                        return rej({ ...error.response.data, msg: error.response.data.message || "Network Error" })
                    }
                    return rej({ message: 'Server is not responding. Please try again' })
                } else {
                    return rej({ message: "Network Error", msg: "Network Error" });
                }
            });
    });
}

export function apiPost(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
    return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'put', headers);
}

export function setItem(key, data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then(data => {
            resolve(JSON.parse(data));
        });
    });
}


export async function clearToken() {
    return AsyncStorage.removeItem('token');
}