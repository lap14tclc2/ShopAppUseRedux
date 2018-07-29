import {
    REGISTER_ACCOUNT,
    REGISTER_ACCOUNT_SUCCESSFULL,
    REGISTER_ACCOUNT_FAILED,

    LOGIN_ACCOUNT,
    LOGIN_ACCOUNT_SUCCESS,
    LOGIN_ACCOUNT_FAILED,
    GET_USERNAME,
} from '../../utils/ActionTypes'

import axios from 'axios'
import { saveToken, check, removeToken, getToken, getHeader } from '../../helpers/asyc.helper'

//const apiUrl = 'http://172.16.1.140:3000/api/auth'
const apiUrl = 'http://192.168.2.106:3000/api/auth'

export function login(data) {

    return dispatch => {
        dispatch({ type: LOGIN_ACCOUNT });
        axios({
            method: 'post',
            url: `${apiUrl}/login`,
            data: {
                username: data.username,
                password: data.password
            }
        }).then(res => {
            if (res.status !== 200) {
                throw Error(res.data)
            }
            return res;
        }).then(res => {
            saveToken(res.data.token);
            dispatch({ type: LOGIN_ACCOUNT_SUCCESS, data: res.data });

        }).catch(err => {
            console.log(err.response.data);
            dispatch({ type: LOGIN_ACCOUNT_FAILED, data: err.response.data })
        });
    }
};

export function register(data) {
    return dispatch => {
        dispatch({ type: REGISTER_ACCOUNT });
        return axios({
            method: 'post',
            url: `${apiUrl}/register`,
            data: {
                username: data.username,
                password: data.password
            }
        }).then(res => {
            dispatch({ type: REGISTER_ACCOUNT_SUCCESSFULL, data: res.data });
        }).catch(err => {
            dispatch({ type: REGISTER_ACCOUNT_FAILED, data: err.response });
        });
    }
};

export async function getUsername() {
    const token = await getToken();
    return dispatch => {
        return axios({
            method: 'get',
            url: `${apiUrl}/me`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then(res => {
            dispatch({ type: GET_USERNAME, data: res.data });
        }).catch(err => {
            console.log(err);
        });
    }
};

export function getUsernameById(id) {
    return axios({
        method: 'get',
        url: `${apiUrl}/user/${id}`,
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
    });
};