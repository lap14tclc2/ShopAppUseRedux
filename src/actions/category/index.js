import {
    GET_CATEGORIES,
    GET_RANDOM_CATEGORY,
    GET_CATEGORY,
    GET_CATEGORY_FAILED
} from '../../utils/ActionTypes'

import axios from 'axios'
import { API_URL } from '../../utils/constants'

export function getRandomCategory() {
    return dispatch => {
        dispatch({ type: GET_CATEGORY })
        axios.get(`${API_URL}/categories/random`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error();
                }
                return res;
            })
            .then(res => {
                dispatch({ type: GET_RANDOM_CATEGORY, data: res.data });
            })
            .catch(err => {
                dispatch({ type: GET_CATEGORY_FAILED, data: err.response.data });
            })
    }
}

export function getCategories() {
    return dispatch => {
        dispatch({ type: GET_CATEGORY })
        axios.get(`${API_URL}/categories`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error();
                }
                return res;
            })
            .then(res => {
                dispatch({ type: GET_CATEGORIES, data: res.data });
            })
            .catch(err => {
                dispatch({ type: GET_CATEGORY_FAILED, data: err.response.data });
            })
    }
}